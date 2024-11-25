
import * as XLSX from "xlsx";
import { Icustomer, Iinvoice, Iproduct } from "../slices/appslice";
import { RawInvoiceData } from "../types/types";
import { generatePrompt } from "./prompts";
import { excelPromptBatchSize } from "../Config/config";
import { executePrompt } from "./genAi";
import { v4 as uuid } from "uuid"
import * as pdfjsLib from "pdfjs-dist"
import pdfToText from "react-pdftotext";
import Tesseract from "tesseract.js";

export function convertExcelToCsv(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {

                // Step 1: Read the file as an ArrayBuffer
                const data = e.target?.result;
                if (!data) {
                    reject("File could not be read.");
                    return;
                }

                // Step 2: Parse the Excel file
                const workbook = XLSX.read(data, { type: "array" });

                const firstSheetName = workbook.SheetNames[0];
                const firstSheet = workbook.Sheets[firstSheetName];

                const json = XLSX.utils.sheet_to_json(firstSheet);
                resolve(json)

            } catch (error) {
                reject("Error processing the file: " + error);
            }
        };

        reader.onerror = () => {
            reject("Failed to read the file.");
        };

        // Step 5: Read the file as binary
        reader.readAsArrayBuffer(file);
    });
}



export function isValidFileType(file: File): boolean {


    // allowed mime types
    const allowedMimeTypes: string[] = [
        //images
        "image/jpeg",
        "image/png",
        "image/webp",
        // PDF
        "application/pdf",
        // Excel (both old and new formats)
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];

    return allowedMimeTypes.includes(file.type);
}

export function isExcelFile(file: File) {

    const excelFileTypes = [
        // Excel (both old and new formats)
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ]
    return excelFileTypes.includes(file.type);
}
export function isPdfFile(file: File) {
    const pdfFileTypes = [
        "application/pdf",
    ]
    return pdfFileTypes.includes(file.type);
}
export function isImageFile(file: File) {
    const imageFileTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
    ]
    return imageFileTypes.includes(file.type);
}






interface TemperaryProduct {
    name: string;
    quantity: string;
    price: string;
    tax: string;
    priceWithTax: string
}


type GroupedInvoice = {
    "Serial Number": string;
    "Invoice Date": string;
    "Products": TemperaryProduct[];
    "customerDetails": { name: string, companyName: string, phNumber: string }
};


export function groupInvoices(data: RawInvoiceData[]): GroupedInvoice[] {
    const groupedData: Record<string, { "Invoice Date": string; "Products": TemperaryProduct[], customerDetails: { name: string, companyName: string, phNumber: string } }> = {};

    data.forEach(item => {
        const invoiceNumber = item["Serial Number"];
        if (invoiceNumber) {
            const invoiceDate = item["Invoice Date"] ?? item["Date"];
            if (!groupedData[invoiceNumber]) {
                groupedData[invoiceNumber] = {
                    "Invoice Date": invoiceDate,
                    "Products": [],
                    customerDetails: {
                        name: "",
                        companyName: "",
                        phNumber: ""
                    }
                };
            }

            // Add product details to the products array
            groupedData[invoiceNumber]["Products"].push({
                name: item["Product Name"],
                quantity: item["Qty"],
                price: item["Net Amount"] ?? item["Unit Price"],
                priceWithTax: item["Item Total Amount"] ?? item["Total Amount"] ?? item["Price with Tax"],
                tax: item["Tax (%)"] ?? item["Tax Amount"]
            });

            // add customer details
            if (groupedData[invoiceNumber].customerDetails.name === "") {
                groupedData[invoiceNumber].customerDetails = {
                    name: item["Party Name"] ?? "",
                    companyName: item["Party Company Name"] ?? "",
                    phNumber: item["Phone Number"] ?? ""
                }
            }
        }

    });

    // Convert grouped data back into an array format
    return Object.entries(groupedData).map(([invoiceNumber, details]) => ({
        "Serial Number": invoiceNumber,
        ...details
    }));
}

export async function handleFileUploads(file: File) {
    try {
        if (isExcelFile(file)) {
            let jsonData: any = await convertExcelToCsv(file);
            const groupedData = groupInvoices(jsonData)
            const batchedInvoices = batchInvoices(groupedData);
            const promises: Promise<any>[] = [];
            for (let data of batchedInvoices) {
                const prompt = generatePrompt("excel", data);
                promises.push(executePrompt(prompt, "array"))
            }
            const result: ExcelInvoiceResponse[][] = await Promise.all(promises);
            const flattenedResult: ExcelInvoiceResponse[] = [];
            result.forEach(res => {
                flattenedResult.push(...res);;
            })
            console.log(result)
            const usableInvoice = convertInvoiceToUsable(flattenedResult)
            return usableInvoice
        }
        if (isPdfFile(file)) {
            const textResponse = await extractPdfText(file)
            const prompt = generatePrompt("pdf", textResponse);
            const promptRes: ExcelInvoiceResponse = await executePrompt(prompt, "obj");
            const usableInvoice = convertInvoiceToUsable([promptRes]);
            return usableInvoice;
        }
        if (isImageFile(file)) {
            const textFromImg = await performOcr(file)
            const prompt = generatePrompt("img", textFromImg);
            const promptRes: ExcelInvoiceResponse = await executePrompt(prompt, "obj");
            const usableInvoice = convertInvoiceToUsable([promptRes]);
            return usableInvoice;
        }
    } catch (err) {
        return Promise.reject(err);
    }

}



interface Product {
    name: string;
    quantity: number;
    price: number;
    tax: number;
    priceWithTax: number;
}

interface AdditionalCharge {
    name: string;
    quantity: number;
    price: number;
    tax: number;
    priceWithTax: number;
}

interface CustomerDetails {
    name: string;
    companyName: string;
    phNumber: string;
    totalPurchase: number
}

export interface ExcelInvoiceResponse {
    SerialNumber: string;
    InvoiceDate: string;
    Products: Product[];
    AdditionalCharges: AdditionalCharge[];
    CustomerDetails: CustomerDetails;
    totalAmount: number,
    totalTax: number
}




function batchInvoices(invoiceData: GroupedInvoice[]) {
    const response: GroupedInvoice[][] = [];
    let temp: GroupedInvoice[] = []
    invoiceData.forEach(data => {
        temp.push(data);
        if (temp.length === excelPromptBatchSize) {
            response.push(temp);
            temp = [];
        }
    })
    if (temp.length > 0) {
        response.push(temp);
    }
    return response;
}

type convertToAppStateProp = {
    invoiceData: ExcelInvoiceResponse[];
    products: Product[];
    customers: CustomerDetails[];
}


function convertInvoiceToUsable(invoiceData: ExcelInvoiceResponse[]): Iinvoice[] {
    const data: Iinvoice[] = invoiceData.map(item => {
        return {
            id: uuid(),
            additionalCharges: item.AdditionalCharges,
            totalAmount: item.totalAmount,
            serialNumber: item.SerialNumber,
            date: item.InvoiceDate,
            qty: item.Products.length,
            customer: { ...item.CustomerDetails, id: uuid(), totalPurchaseAmount: item.CustomerDetails.totalPurchase, phone: item.CustomerDetails.phNumber },
            tax: item.totalTax,
            products: item.Products.map(product => { return { ...product, id: uuid() } })
        }
    })
    return data;
}

export async function extractPdfText(pdfFile: File) {
    try {
        const response = await pdfToText(pdfFile)
        return Promise.resolve(response)
    } catch (err) {
        return Promise.reject(err)
    }
};

export async function performOcr(file: File) {
    try {

        const { data } = await Tesseract.recognize(file, 'eng');
        console.log(data.text);
        return Promise.resolve(data.text);
    } catch (error) {
        console.error('OCR failed:', error);
        return Promise.reject(error)
    }
};