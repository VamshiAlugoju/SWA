import React, { useMemo, useState } from 'react'
import Example from '../components/Table'
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    getMRT_RowSelectionHandler,
} from 'material-react-table';
import { useSelector } from "react-redux"
import { RootState } from '../store/store';
import { Iinvoice } from '../slices/appslice';
import { Modal } from '@mui/material';
import { RxCross2 } from "react-icons/rx";
import InvoiceData from '../components/InvoiceData';

function Invoice() {
    const invoiceData = useSelector((state: RootState) => state.invoices);
    const [showModal, setShowModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<Iinvoice | null>(null);

    const columns = useMemo<MRT_ColumnDef<Iinvoice>[]>(
        () => [
            {
                accessorKey: "serialNumber",
                header: 'Seriol No',
                size: 150,

            },
            {
                accessorKey: "date",
                header: 'Date',
                size: 150,
            },

            {
                accessorKey: "customer.name",
                header: 'Customer Name',
                size: 150,
            },
            {
                accessorFn: (row) => {
                    if (row.products.length > 0) {
                        console.log(row.products[0].name, "at here")
                        return row.products[0].name;
                    }
                    return ""
                },
                header: 'Product Name',
                size: 150,
            },
            {
                accessorKey: "tax",
                header: 'Tax',
                size: 150,
            },
            {
                accessorKey: "totalAmount", //access nested data with dot notation
                header: 'Total Amount',
                size: 150,
            },
            {
                accessorKey: "customer.name", //access nested data with dot notation
                header: 'Customer Name',
                size: 150,
            },
        ],
        [],
    );

    // console.log(invoiceData)

    const table = useMaterialReactTable({
        columns,
        data: invoiceData,
        initialState: { density: "compact" },
        enableDensityToggle: false,
        enableFullScreenToggle: false,
        enableColumnFilters: false,
        muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({
            onClick: (event) => {
                setSelectedInvoice(row.original)
                setShowModal(true)
            }
        }),

    });

    return <div className='max-h-screen  overflow-scroll'>
        <MaterialReactTable table={table} />
        <Modal
            open={showModal}
            onClose={() => { setShowModal(false) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="h-screen  flex justify-center items-center"
        >
            <div className="bg-white w-fit max-w-6xl h-full ml-auto p-5 min-w-40 rounded-sm my-auto overflow-y-scroll pb-10">
                <div>
                    <button onClick={() => setShowModal(false)} className='bg-white border-none'>
                        <RxCross2 />
                    </button>
                </div>
                {selectedInvoice && <InvoiceData id={selectedInvoice.id} />}

            </div>

        </Modal>
    </div>
}

export default Invoice