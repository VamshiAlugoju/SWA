import { Modal, Box, Typography } from "@mui/material"
import { useState } from "react"
import CustomerForm from "./Forms/CustomerForm";
import { useSelector } from 'react-redux'
import { RootState } from "../store/store";

export default function Example() {
    const [open, setOpen] = useState(false);
    const customerData = useSelector((state: RootState) => state.customers);
    console.log("came here broo", customerData)
    return (
        <div >
            <button className="p-3 bg-blue-200" onClick={() => setOpen(true)}>open</button>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="h-screen bg-blue-300 flex justify-center items-center"
            >
                <div className="bg-white w-fit mx-auto p-5 rounded-sm my-auto">
                    <CustomerForm id={customerData[0].id} />
                </div>

            </Modal>
        </div>
    )
}