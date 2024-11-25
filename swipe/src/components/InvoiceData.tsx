import { useFormik } from 'formik';
import { Button } from '@mui/material';
import { useSelector } from "react-redux";
import { RootState } from '../store/store';
import CustomInputWithLabel from './CustomInput';
import { Icustomer, Iproduct } from '../slices/appslice';
import { Modal } from '@mui/material';
import { useState } from 'react';
import SelectModal from './SelectModal';



const producctss: Iproduct = {
    id: "452",
    name: ";lfisjd",
    price: 48,
    priceWithTax: 893,
    quantity: 2,
    tax: 379
}

function InvoiceData({ id }: { id: string }) {
    const { invoices } = useSelector((state: RootState) => state);
    const invoiceDetails = invoices.find(item => item.id === id);
    const [showModal, setShowModal] = useState(false)
    const [isSelctedProduct, setIsSelctedProduct] = useState(false)
    const formik = useFormik({
        initialValues: {
            id: invoiceDetails?.id ?? "",
            serialNumber: invoiceDetails?.serialNumber || "",
            date: invoiceDetails?.date ?? "",
            qty: invoiceDetails?.qty ?? 0,
            tax: invoiceDetails?.tax ?? 0,
            totalAmount: invoiceDetails?.totalAmount ?? 0,
            products: invoiceDetails?.products ?? [], // Assumes products is an array
            customer: invoiceDetails?.customer ?? {} as Icustomer, // Assumes customer is an object
            additionalCharges: invoiceDetails?.additionalCharges ?? []
        },

        onSubmit: (values) => {
            console.log("Form Submitted:", values);
        },
    });
    console.log(formik.values)

    function handleUpdate() {
        console.log("Update clicked");
        console.log(formik.values);
        // Add your dispatch logic here
    }
    function handleItemSelction(id: string) {

    }

    return (
        <div className="min-w-96 max-w-2xl h-full">
            <form onSubmit={formik.handleSubmit} className="gap-10">
                <DataShow label='Serial Number' value={formik.values.serialNumber} />
                <CustomInputWithLabel
                    id="date"
                    name="date"
                    label="Invoice Date"
                    type="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled
                />
                <div className='my-2 border-b'>

                    <ProductShow products={formik.values.products} title='Products :' emptyBtntitle="Select Product" emptybtnHandler={() => { setIsSelctedProduct(true); setShowModal(true) }} />

                </div>
                {formik.values.additionalCharges.length > 0 && <div className='my-2 mt-4 border-b'>

                    {<ProductShow products={formik.values.additionalCharges} title='Additional Charges :' emptyBtntitle="Select Product" emptybtnHandler={() => { setIsSelctedProduct(false); setShowModal(true) }} />}
                </div>}
                <div>
                    <InvoiceCustomerDetails customer={formik.values.customer} />
                </div>
                <CustomInputWithLabel
                    id="qty"
                    name="qty"
                    label="Quantity"
                    type="number"
                    value={formik.values.qty}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled
                />
                <CustomInputWithLabel
                    id="tax"
                    name="tax"
                    label="Tax"
                    type="number"
                    value={formik.values.tax}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled
                />
                <CustomInputWithLabel
                    id="totalAmount"
                    name="totalAmount"
                    label="Total Amount"
                    type="number"
                    value={formik.values.totalAmount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled
                />

            </form>
            <Modal
                open={showModal}
                onClose={() => { setShowModal(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="h-screen  flex justify-center items-center"
            >
                <div className="bg-white w-fit mx-auto p-5 rounded-sm my-auto">
                    <SelectModal isProducts={isSelctedProduct} selectHandler={handleItemSelction} title={isSelctedProduct ? "Products" : "Customers"} />
                </div>

            </Modal>
        </div>
    );
}

export default InvoiceData;

function DataShow({ label, value }: { label: string; value: string }) {
    return <div className='flex gap-4 items-center'>
        <label className='text-black  font-bold' htmlFor=""> {label}: </label>
        <p className='text-black'> {value} </p>
    </div>
}

type ProductShowProps = {
    name: string;
    price: number;

}
function ProductShow({ products, title, emptyBtntitle, emptybtnHandler }: {
    products: ProductShowProps[], title: string, emptyBtntitle?: string;
    emptybtnHandler?: () => void
}) {

    return (
        <div className=" my-2 mb-4 bg-white rounded-lg     mx-auto">
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                {title}
            </h2>
            {products.length > 0 ? <div className="space-y-4">
                {products.map((product, idx) => {
                    return <div key={idx} className='bg-white hover:bg-slate-100 flex items-center cursor-pointer gap-4 px-3 py-2 rounded'>
                        <p className='h-full  w-1/5 text-black  '> <span className='font-bold'>{idx + 1}</span> :  </p>
                        <p className='h-full w-3/5  text-slate-500 font-bold'> {product.name} </p>
                        <p className='h-full w-1/5  text-slate-500 font-bold'> {product.price}rs </p>
                    </div>
                })}
            </div> : <div className='space-y-4 flex justify-end'>
                <button className='text-black p-1 rounded border' onClick={emptybtnHandler}> {emptyBtntitle} </button>
            </div>}
            <div>


            </div>
        </div>
    )


}



function InvoiceCustomerDetails({ customer }: { customer: Icustomer }) {
    return (
        <div className=" my-2 mb-4 bg-white rounded-lg     mx-auto">
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                Customer Details
            </h2>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Name:</span>
                    <span className="text-gray-700 font-semibold">{customer?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Phone:</span>
                    <span className="text-gray-700 font-semibold">{customer?.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Company Name:</span>
                    <span className="text-gray-700 font-semibold">{customer?.companyName}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Total Purchases:</span>
                    <span className="text-gray-700 font-semibold">
                        {customer?.totalPurchaseAmount?.toLocaleString()}rs
                    </span>
                </div>
            </div>
        </div>
    );
}