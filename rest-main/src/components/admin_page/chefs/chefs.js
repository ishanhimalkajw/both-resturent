import React, { useState } from 'react';
import Sidebar from '../sidebar'; // Import Sidebar component

const ManageChefs = () => {
    // Dummy data for initial list of chefs
    const initialChefs = [
        { id: 1, name: 'Gordon Ramsay', email: 'gordon.ramsay@example.com', address: '123 Culinary St', password: 'hellskitchen' },
        { id: 2, name: 'Jamie Oliver', email: 'jamie.oliver@example.com', address: '456 Food Ave', password: 'foodrevolution' },
        // Add more dummy data as needed
    ];

    // State to manage chefs
    const [chefs, setChefs] = useState(initialChefs);

    // State for form inputs
    const [chefName, setChefName] = useState('');
    const [chefEmail, setChefEmail] = useState('');
    const [chefAddress, setChefAddress] = useState('');
    const [chefPassword, setChefPassword] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editChefId, setEditChefId] = useState(null);

    // Function to handle editing a chef
    const handleEditChef = (id) => {
        const chefToEdit = chefs.find(chef => chef.id === id);
        if (chefToEdit) {
            setChefName(chefToEdit.name);
            setChefEmail(chefToEdit.email);
            setChefAddress(chefToEdit.address);
            setChefPassword(chefToEdit.password);
            setEditMode(true);
            setEditChefId(id);
        }
    };

    // Handle form submission for adding/editing a chef
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode && editChefId !== null) {
            // Update existing chef
            const updatedChefs = chefs.map(chef =>
                chef.id === editChefId ? { ...chef, name: chefName, email: chefEmail, address: chefAddress, password: chefPassword } : chef
            );
            setChefs(updatedChefs);
            setEditMode(false);
            setEditChefId(null);
        } else {
            // Add new chef
            const newChef = {
                id: chefs.length + 1,
                name: chefName,
                email: chefEmail,
                address: chefAddress,
                password: chefPassword
            };
            setChefs([...chefs, newChef]);
        }
        // Clear form inputs
        setChefName('');
        setChefEmail('');
        setChefAddress('');
        setChefPassword('');
    };

    // Function to handle deleting a chef
    const handleDeleteChef = (id) => {
        const updatedChefs = chefs.filter(chef => chef.id !== id);
        setChefs(updatedChefs);
    };

    // Function to handle cancelling edit mode
    const cancelEditMode = () => {
        setEditMode(false);
        setEditChefId(null);
        setChefName('');
        setChefEmail('');
        setChefAddress('');
        setChefPassword('');
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex-1 min-h-screen p-8">
                <h2 className="text-2xl font-bold mb-4">Manage Chefs</h2>

                {/* Form to add or edit a chef */}
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
                        <input
                            type="text"
                            placeholder="Chef Name"
                            value={chefName}
                            onChange={(e) => setChefName(e.target.value)}
                            className="border rounded py-2 px-3"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Chef Email"
                            value={chefEmail}
                            onChange={(e) => setChefEmail(e.target.value)}
                            className="border rounded py-2 px-3"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Address"
                            value={chefAddress}
                            onChange={(e) => setChefAddress(e.target.value)}
                            className="border rounded py-2 px-3"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={chefPassword}
                            onChange={(e) => setChefPassword(e.target.value)}
                            className="border rounded py-2 px-3"
                            required
                        />
                        {editMode ? (
                            <div className="flex space-x-4 mt-2 md:mt-0">
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
                                Add Chef
                            </button>
                        )}
                    </div>
                </form>

                {/* Display table of chefs */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-2 px-4">Name</th>
                                <th className="text-left py-2 px-4">Email</th>
                                <th className="text-left py-2 px-4">Address</th>
                                <th className="text-left py-2 px-4">Password</th>
                                <th className="text-left py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chefs.map(chef => (
                                <tr key={chef.id} className="border-b border-gray-200">
                                    <td className="py-2 px-4">{chef.name}</td>
                                    <td className="py-2 px-4">{chef.email}</td>
                                    <td className="py-2 px-4">{chef.address}</td>
                                    <td className="py-2 px-4">{chef.password}</td>
                                    <td className="py-2 px-4">
                                        <button
                                            onClick={() => handleEditChef(chef.id)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteChef(chef.id)}
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

export default ManageChefs;
