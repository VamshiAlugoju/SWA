
import React, { useMemo, useState } from 'react'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  getMRT_RowSelectionHandler,
} from 'material-react-table';
import { useSelector } from "react-redux"
import { RootState } from '../store/store';
import { Icustomer, Iinvoice } from '../slices/appslice';
import CustomerForm from '../components/Forms/CustomerForm';
import { Modal } from '@mui/material';
function People() {
  const customerData = useSelector((state: RootState) => state.customers);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Icustomer | null>(null)
  console.log(customerData)
  const columns = useMemo<MRT_ColumnDef<Icustomer>[]>(
    () => [
      {
        accessorKey: "name",
        header: 'Name',
        size: 150,

      },
      {
        accessorKey: "phone",
        header: 'Phone Number',
        size: 150,
      },
      {
        accessorKey: "companyName",
        header: "Company Name",
        size: 150
      },
      {
        accessorKey: "totalPurchaseAmount",
        header: 'Total Purchase',
        size: 150,
      },

    ],
    [],
  );

  // console.log(invoiceData)

  const table = useMaterialReactTable({
    columns,
    data: customerData,
    initialState: { density: "compact" },
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableColumnFilters: false,
    muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({
      onClick: (event) => {
        setSelectedCustomer(row.original);
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
      <div className="bg-white w-fit mx-auto p-5 rounded-sm my-auto">
        {selectedCustomer && <CustomerForm id={selectedCustomer.id} />}
      </div>

    </Modal>
  </div>
}

export default People