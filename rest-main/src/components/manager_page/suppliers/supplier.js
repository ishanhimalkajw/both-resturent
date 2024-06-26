import React, { useState } from 'react';
import Sidebar from '../sidebar'; // Import Sidebar component

const ManageSuppliers = () => {
    // Dummy data for initial list of suppliers
    const initialSuppliers = [
        { id: 1, name: 'Supplier X', contact: '123-456-7890', address: '123 Supplier St' },
        { id: 2, name: 'Supplier Y', contact: '987-654-3210', address: '456 Supplier Ave' },
        // Add more dummy data as needed
    ];

    // State to manage suppliers
    const [suppliers, setSuppliers] = useState(initialSuppliers);

    // State for form inputs
    const [supplierName, setSupplierName] = useState('');
    const [supplierContact, setSupplierContact] = useState('');
    const [supplierAddress, setSupplierAddress] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editSupplierId, setEditSupplierId] = useState(null);

    // Function to handle editing a supplier
    const handleEditSupplier = (id) => {
        const supplierToEdit = suppliers.find(supplier => supplier.id === id);
        if (supplierToEdit) {
            setSupplierName(supplierToEdit.name);
            setSupplierContact(supplierToEdit.contact);
            setSupplierAddress(supplierToEdit.address);
            setEditMode(true);
            setEditSupplierId(id);
        }
    };

    // Handle form submission for adding/editing a supplier
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode && editSupplierId !== null) {
            // Update existing supplier
            const updatedSuppliers = suppliers.map(supplier =>
                supplier.id === editSupplierId ? { ...supplier, name: supplierName, contact: supplierContact, address: supplierAddress } : supplier
            );
            setSuppliers(updatedSuppliers);
            setEditMode(false);
            setEditSupplierId(null);
        } else {
            // Add new supplier
            const newSupplier = {
                id: suppliers.length + 1,
                name: supplierName,
                contact: supplierContact,
                address: supplierAddress
            };
            setSuppliers([...suppliers, newSupplier]);
        }
        // Clear form inputs
        setSupplierName('');
        setSupplierContact('');
        setSupplierAddress('');
    };

    // Function to handle deleting a supplier
    const handleDeleteSupplier = (id) => {
        const updatedSuppliers = suppliers.filter(supplier => supplier.id !== id);
        setSuppliers(updatedSuppliers);
    };

    // Function to handle cancelling edit mode
    const cancelEditMode = () => {
        setEditMode(false);
        setEditSupplierId(null);
        setSupplierName('');
        setSupplierContact('');
        setSupplierAddress('');
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex-1 min-h-screen p-8">
                <h2 className="text-2xl font-bold mb-4">Manage Suppliers</h2>

                {/* Form to add or edit a supplier */}
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="flex space-x-4 mb-4">
                        <input
                            type="text"
                            placeholder="Supplier Name"
                            value={supplierName}
                            onChange={(e) => setSupplierName(e.target.value)}
                            className="border rounded py-2 px-3"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Contact Number"
                            value={supplierContact}
                            onChange={(e) => setSupplierContact(e.target.value)}
                            className="border rounded py-2 px-3"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Address"
                            value={supplierAddress}
                            onChange={(e) => setSupplierAddress(e.target.value)}
                            className="border rounded py-2 px-3"
                            required
                        />
                        {editMode ? (
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={cancelEditMode}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Add Supplier
                            </button>
                        )}
                    </div>
                </form>

                {/* Display list of suppliers in a table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="py-2 px-4 border-r">Name</th>
                                <th className="py-2 px-4 border-r">Contact</th>
                                <th className="py-2 px-4 border-r">Address</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.map(supplier => (
                                <tr key={supplier.id} className="border-b">
                                    <td className="py-2 px-4 border-r">{supplier.name}</td>
                                    <td className="py-2 px-4 border-r">{supplier.contact}</td>
                                    <td className="py-2 px-4 border-r">{supplier.address}</td>
                                    <td className="py-2 px-4">
                                        <button
                                            onClick={() => handleEditSupplier(supplier.id)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteSupplier(supplier.id)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageSuppliers;
