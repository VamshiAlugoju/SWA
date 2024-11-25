import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// types.ts

export interface Iinvoice {
    id: string,
    serialNumber: string;
    products: Iproduct[];
    customer: Icustomer;
    date: string;
    qty: number;
    tax: number;
    totalAmount: number;
    additionalCharges: IadditionalCharge[]
}

export interface IadditionalCharge {
    name: string;
    price: number;
    priceWithTax: number;
}

export interface Iproduct {
    id: string;
    name: string;
    quantity: number;
    price: number;
    tax: number;
    priceWithTax: number;
}

export interface Icustomer {
    id: string;
    name: string;
    phone: string;
    companyName: string;
    totalPurchaseAmount: number;
}

export interface IinitialState {
    invoices: Iinvoice[];
    products: Iproduct[];
    customers: Icustomer[];
}

export const initialState: IinitialState = {
    invoices: [],
    products: [],
    customers: []
}


const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        uploadData: (state, action: PayloadAction<{
            invoices: Iinvoice[];

        }>) => {
            const { invoices } = action.payload;
            const customers = invoices.map(invoice => invoice.customer);
            const products: Iproduct[] = [];
            invoices.forEach(item => {
                products.push(...item.products)
            })
            state.invoices.push(...invoices)
            state.products.push(...products)
            state.customers.push(...customers);
        },
        updateProduct: (state, action: PayloadAction<{ product: Iproduct }>) => {
            const { product } = action.payload;

            const prevProductIdx = state.products.findIndex(pro => pro.id === product.id);
            if (prevProductIdx < 0) return;
            state.products[prevProductIdx] = product;


            state.invoices = state.invoices.map(invoice => {

                const updatedProducts = invoice.products.map(p =>
                    p.id === product.id ? product : p
                );
                return { ...invoice, products: updatedProducts };
            });
        },
        updateCustomer: (state, action: PayloadAction<{
            customer: Icustomer,
        }>) => {
            const { customer } = action.payload
            const prevCustomerIdx = state.customers.findIndex(cust => cust.id === customer.id);
            if (prevCustomerIdx < 0) return state;
            state.customers[prevCustomerIdx] = customer;

            const updatedInvoice = state.invoices.map(item => {
                if (item.customer.id === customer.id) {
                    return { ...item, customer };
                }
                return item;
            })
            state.invoices = updatedInvoice
        },
    },
});

export const { uploadData, updateProduct, updateCustomer } = dataSlice.actions;

export default dataSlice.reducer;
