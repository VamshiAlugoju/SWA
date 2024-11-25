
import React, { useMemo, useState } from 'react'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  getMRT_RowSelectionHandler,
} from 'material-react-table';
import { useSelector } from "react-redux"
import { RootState } from '../store/store';
import { Icustomer, Iinvoice, Iproduct } from '../slices/appslice';
import { Modal } from '@mui/material';
import ProductForm from '../components/Forms/ProductForm';

function Products() {
  const productData = useSelector((state: RootState) => state.products);
  const [selectedProduct, setSelectedProduct] = useState<Iproduct | null>(null);
  const [showModal, setShowModal] = useState(false);
  const columns = useMemo<MRT_ColumnDef<Iproduct>[]>(
    () => [
      {
        accessorKey: "name",
        header: 'Name',
        size: 150,

      },
      {
        accessorKey: "quantity",
        header: 'Quantity',
        size: 150,
      },

      {
        accessorKey: "price",
        header: 'Price',
        size: 150,
      },
      {
        accessorKey: "tax",
        header: 'Tax',
        size: 150,
      },

      {
        accessorKey: "priceWithTax",
        header: 'Price With Tax',
        size: 150,
      },
    ],
    [],
  );

  // console.log(invoiceData)

  const table = useMaterialReactTable({
    columns,
    data: productData,
    initialState: { density: "compact" },
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableColumnFilters: false,
    enableSorting: false,
    muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({
      onClick: (event) => {
        console.log(row.original.id)
        setSelectedProduct(row.original);
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
        {selectedProduct && <ProductForm id={selectedProduct.id} />}
      </div>

    </Modal>
  </div>
}

export default Products