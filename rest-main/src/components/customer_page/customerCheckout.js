import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderedItems, totalPrice } = location.state || {};

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        paymentMethod: 'credit_card',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to backend)
        console.log('Form submitted:', formData);
        // Redirect to review page after successful submission
        navigate('/review');
    };

    if (!orderedItems || !totalPrice) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-6">
                    <h3 className="text-lg font-bold mb-2">Ordered Items:</h3>
                    {orderedItems.map((item) => (
                        <div key={item.ItemID} className="flex justify-between py-2">
                            <p>{item.Name}</p>
                            <p>{item.qty} x ${item.Price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
                <div className="mb-6">
                    <h3 className="text-lg font-bold mb-2">Total Price:</h3>
                    <p className="font-bold">${totalPrice.toFixed(2)}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-sm font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="address" className="block text-sm font-bold mb-2">
                            Address
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows={4}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="paymentMethod" className="block text-sm font-bold mb-2">
                            Payment Method
                        </label>
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="credit_card">Credit Card</option>
                            <option value="debit_card">Debit Card</option>
                            <option value="paypal">PayPal</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    {formData.paymentMethod === 'credit_card' && (
                        <div className="mb-6">
                            <label htmlFor="cardNumber" className="block text-sm font-bold mb-2">
                                Card Number
                            </label>
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                    )}
                    <div className="flex justify-between">
                        <Link
                            to="/menu"
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Back to Menu
                        </Link>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Confirm Payment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
