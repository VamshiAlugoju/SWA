import React from 'react'
import { useSelector } from "react-redux"
import { RootState } from '../store/store';

type selctModalProps = {
    title: string,
    isProducts: boolean;
    selectHandler: (id: string) => void;

}

function SelectModal({ title, isProducts, selectHandler }: selctModalProps) {
    const appState = useSelector((state: RootState) => state);
    return <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
        <div className="text-center mb-4">
            <p className="text-xl font-bold text-gray-800">
                {isProducts ? "Products" : "Customers"}
            </p>
        </div>
        <div className="space-y-4">
            {isProducts
                ? appState.products.map((product, idx) => (
                    <button
                        key={idx}
                        className="flex items-center justify-between p-4 w-full bg-blue-50 hover:bg-blue-100 rounded-md border border-blue-300 transition ease-in-out"
                        onClick={() => selectHandler(product.id)}
                    >
                        <span className="text-sm font-medium text-gray-600">{idx + 1}:</span>
                        <span className="flex-grow ml-2 text-gray-800 font-semibold">
                            {product.name}
                        </span>
                        <span className="text-sm text-blue-600 font-bold">
                            ${product.price}
                        </span>
                    </button>
                ))
                : appState.customers.map((customer, idx) => (
                    <button
                        key={idx}
                        className="flex items-center justify-between p-4 w-full bg-green-50 hover:bg-green-100 rounded-md border border-green-300 transition ease-in-out"
                        onClick={() => selectHandler(customer.id)}
                    >
                        <span className="text-sm font-medium text-gray-600">{idx + 1}:</span>
                        <span className="flex-grow ml-2 text-gray-800 font-semibold">
                            {customer.name}
                        </span>
                        <span className="text-sm text-green-600 font-bold">
                            {customer.phone}
                        </span>
                    </button>
                ))}
        </div>
    </div>

}

export default SelectModal