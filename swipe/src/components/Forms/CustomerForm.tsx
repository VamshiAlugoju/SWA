import React from 'react'
import { Formik, useFormik } from 'formik'
import { Button, TextField } from '@mui/material';
import { useSelector } from "react-redux"
import { RootState } from '../../store/store';
import { useDispatch } from "react-redux"
import { updateCustomer } from '../../slices/appslice';
import CustomInputWithLabel from '../CustomInput';

function CustomerForm({ id }: { id: string }) {
    const customerState = useSelector((state: RootState) => state.customers);
    const customerDetails = customerState.find(customer => customer.id === id);
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: customerDetails?.name ?? "",
            phone: customerDetails?.phone ?? "",
            id: customerDetails?.id ?? "",
            companyName: customerDetails?.companyName ?? "",
            totalPurchaseAmount: customerDetails?.totalPurchaseAmount ?? 0
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    function handleUpdate() {
        console.log("clicked")
        console.log(formik.values)
        dispatch(updateCustomer({ customer: formik.values }));
    }

    return (
        <div className='min-w-96 max-w-2xl h-full'>
            <form onSubmit={formik.handleSubmit} className='gap-10'>

                <CustomInputWithLabel

                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}

                />
                <CustomInputWithLabel

                    id="phone"
                    name="phone"
                    label="Phone"
                    type="text"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}

                />
                <CustomInputWithLabel

                    id="companyName"
                    name="companyName"
                    label="CompanyName"
                    type="text"
                    value={formik.values.companyName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}

                />
                <CustomInputWithLabel

                    id="totalPurchaseAmount"
                    name="totalPurchaseAmount"
                    label="Total Purchase"
                    type="number"
                    value={formik.values.totalPurchaseAmount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}

                />
                <Button color="primary" variant="contained" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleUpdate()
                }}  >
                    Update
                </Button>
            </form>
        </div>
    );
}

export default CustomerForm


