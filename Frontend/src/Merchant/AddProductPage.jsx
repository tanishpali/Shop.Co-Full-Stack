import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

const AddProductPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        category: '',
        subCategory: '',
        price: '',
        description: '',
    });
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleSubmit = async () => {
        if (!data.name || !data.price || !data.category) {
            toast.error("Please fill in key details: Name, Price, Category");
            return;
        }

        setIsAnalyzing(true);
        try {
            const token = Cookies.get('token');
            if (!token) {
                toast.error("Authentication required.");
                return;
            }

            // Map frontend data structure to backend expected structure
            // Backend expects: productName, category, subCategory, price, description
            // Frontend 'data' has: name, ...
            const payload = {
                productName: data.name,
                category: data.category,
                subCategory: data.subCategory,
                price: data.price,
                description: data.description,
                productImages: ['https://picsum.photos/seed/new/300'] // Placeholder until image upload is added to form
            };

            const res = await fetch('http://localhost:4000/merchant-add-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const responseData = await res.json();

            if (res.ok) {
                toast.success("Product successfully added to your boutique.");
                navigate('/seller/inventory');
            } else {
                toast.error(responseData.msg || "Failed to add product");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10 fade-in-up">
            <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-8">New Acquisition</h1>
            <ProductForm
                data={data}
                setData={setData}
                onSubmit={handleSubmit}
                isAnalyzing={isAnalyzing}
            />
        </div>
    );
};

export default AddProductPage;
