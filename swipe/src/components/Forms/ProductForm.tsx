import { useFormik } from 'formik';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../store/store';
import { updateProduct } from '../../slices/appslice';
import CustomInputWithLabel from '../CustomInput';

function ProductForm({ id }: { id: string }) {
    const productsState = useSelector((state: RootState) => state.products);
    const productDetails = productsState.find(product => product.id === id);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            id: productDetails?.id ?? "",
            name: productDetails?.name ?? "",
            quantity: productDetails?.quantity ?? 0,
            price: productDetails?.price ?? 0,
            tax: productDetails?.tax ?? 0,
            priceWithTax: productDetails?.priceWithTax ?? 0,
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));

        },
    });

    function handleUpdate() {
        console.log("Update clicked");
        console.log(formik.values);
        // Dispatch update logic here
        dispatch(updateProduct({ product: formik.values }));
    }

    return (
        <div className='min-w-96 max-w-2xl h-full'>
            <form onSubmit={formik.handleSubmit} className='gap-10'>
                <CustomInputWithLabel
                    id="name"
                    name="name"
                    label="Product Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <CustomInputWithLabel
                    id="quantity"
                    name="quantity"
                    label="Quantity"
                    type="number"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <CustomInputWithLabel
                    id="price"
                    name="price"
                    label="Price"
                    type="number"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <CustomInputWithLabel
                    id="tax"
                    name="tax"
                    label="Tax"
                    type="number"
                    value={formik.values.tax}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <CustomInputWithLabel
                    id="priceWithTax"
                    name="priceWithTax"
                    label="Price with Tax"
                    type="number"
                    value={formik.values.priceWithTax}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <Button
                    type="button"
                    color="primary"
                    variant="contained"
                    onClick={(e) => {
                        e.preventDefault();
                        handleUpdate();
                    }}
                >
                    Update
                </Button>

            </form>
        </div>
    );
}

export default ProductForm;
