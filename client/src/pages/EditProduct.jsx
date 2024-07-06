import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../api/products"; // Adjust the import path as necessary

const EditProduct = () => {
    const { product_id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        product_id: '',
        product_name: '',
        quantity: '',
        unit: '',
        price: '',
    });

    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await getProductById(product_id);
            setProduct(productData);
        };

        fetchProduct();
    }, [product_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateProduct(product_id, product);
        navigate('/inventory'); // Redirect to the inventory page after updating
    };

    return (
        <div className="h-screen flex items-center justify-center bg-white text-gray-800">
            <div className="p-5 border border-gray-300 rounded bg-gray-200">
                <h2 className="text-3xl font-semibold mb-4">Edit Product</h2>
                <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="product_id"
                        value={product.product_id}
                        onChange={handleChange}
                        placeholder="Product ID"
                        className="rounded border border-gray-300 bg-white px-3 py-2 text-gray-800"
                        disabled
                    />
                    <input
                        type="text"
                        name="product_name"
                        value={product.product_name}
                        onChange={handleChange}
                        placeholder="Product Name"
                        className="rounded border border-gray-300 bg-white px-3 py-2 text-gray-800"
                    />
                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        placeholder="Quantity"
                        className="rounded border border-gray-300 bg-white px-3 py-2 text-gray-800"
                    />
                    <input
                        type="text"
                        name="unit"
                        value={product.unit}
                        onChange={handleChange}
                        placeholder="Unit"
                        className="rounded border border-gray-300 bg-white px-3 py-2 text-gray-800"
                    />
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="rounded border border-gray-300 bg-white px-3 py-2 text-gray-800"
                    />
                    <button
                        type="submit"
                        className="p-3 rounded bg-gray-300   hover:text-white focus:outline-none"
                    >
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
