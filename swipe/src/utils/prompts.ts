

type fileType = "pdf" | "img" | "excel";

export function generatePrompt(fileType: fileType, data: any[] | string) {

    if (fileType === "excel") {
        const prompt = `
You are given a list of invoices in the following format:

${JSON.stringify(data)}

Please process this data and output it in the following format:

{
  "SerialNumber": string,
  "InvoiceDate": string,
  "Products": [
    {
      "name": string,
      "quantity": number,
      "price": number,
      "tax": number,
      "priceWithTax": number
    }
  ],
  "AdditionalCharges": [
    {
      "name": string,
      "quantity": string,
      "price": string,
      "tax": string,
      "priceWithTax": string
    }
  ],
  "CustomerDetails": {
    "name": string,
    "companyName": string,
    "phNumber": string,
    "totalPurchase":number
  }
  "totalAmount":number,
  "totalTax":number
}

For each invoice:
- Extract the **Products** array, excluding any services like shipping charges, making charges, etc.
- Create an **Additional Charges** array that contains any non-product entries such as shipping charges, making charges, or other services.
- Ensure **customer details** (name, company, phone number,totalPurchase) are included, even if some fields are missing.totalPurchase is the totalAmount of the invoice.
- Provide the output in the exact format above.
Please do not include any programming functions or code. Just provide the processed data in the format above.
`;

        return prompt;
    }
    else if (fileType === "pdf" || fileType === "img") {
        const prompt = `
You are given a plain text version of an invoice. Process the following information from the invoice:

${JSON.stringify(data)}

Output the data in this format:

{
  "SerialNumber": string,
  "InvoiceDate": string,
  "Products": [
    {
      "name": string,
      "quantity": number,
      "price": number,
      "tax": number,
      "priceWithTax": number
    }
  ],
  "AdditionalCharges": [
    {
      "name": string,
      "quantity": string,
      "price": string,
      "tax": string,
      "priceWithTax": string
    }
  ],
  "CustomerDetails": {
    "name": string,
    "companyName": string,
    "phNumber": string,
    "totalPurchase": number
  },
  "totalAmount": number,
  "totalTax": number
}

Instructions:
- Extract **Products**: Include only product entries. Exclude services like shipping, making charges, etc.
- Extract **Additional Charges**: Include non-product services like shipping or other charges.
- Include **CustomerDetails**: Extract name, company, phone number, and set totalPurchase to the invoice's totalAmount. Include even if some fields are missing.
- Ensure totalAmount and totalTax are accurately extracted.
- Provide the output strictly in the format above without additional comments or code.
`;
        return prompt
    }
    return ""

}