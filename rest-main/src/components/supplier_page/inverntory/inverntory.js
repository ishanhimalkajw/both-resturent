import React, { useState } from 'react';
import Sidebar from '../sidebar'; // Import Sidebar component

const SupplierInventory = () => {
  // Dummy data for initial list of food items and branches
  const initialFoodItems = [
    { id: 1, name: 'Pizza', description: 'Delicious pizza with toppings', quantity: 20, unitPrice: 12.99, branchId: 1 },
    { id: 2, name: 'Burger', description: 'Juicy burger with fries', quantity: 15, unitPrice: 8.99, branchId: 2 },
    { id: 3, name: 'Salad', description: 'Healthy salad with fresh greens', quantity: 30, unitPrice: 6.49, branchId: 1 },
    // Add more dummy data as needed
  ];

  const initialBranches = [
    { id: 1, name: 'Branch A' },
    { id: 2, name: 'Branch B' },
    // Add more dummy branches as needed
  ];

  // State to manage food items and branches
  const [foodItems, setFoodItems] = useState(initialFoodItems);
  const [branches, setBranches] = useState(initialBranches);
  const [selectedBranch, setSelectedBranch] = useState(''); // State to store selected branch for filtering

  // Function to handle branch filter change
  const handleBranchFilterChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  // Function to filter food items by branch
  const filteredFoodItems = selectedBranch
    ? foodItems.filter(item => item.branchId === parseInt(selectedBranch))
    : foodItems;

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 min-h-screen p-8">
        <h2 className="text-2xl font-bold mb-4">Manage Inventory</h2>

        {/* Branch filter dropdown */}
        <div className="mb-4">
          <label htmlFor="branchFilter" className="mr-2 font-bold">Filter by Branch:</label>
          <select
            id="branchFilter"
            value={selectedBranch}
            onChange={handleBranchFilterChange}
            className="border rounded py-2 px-3"
          >
            <option value="">All Branches</option>
            {branches.map(branch => (
              <option key={branch.id} value={branch.id}>{branch.name}</option>
            ))}
          </select>
        </div>

        {/* Display list of food items in a table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 border-r">Name</th>
                <th className="py-2 px-4 border-r">Description</th>
                <th className="py-2 px-4 border-r">Quantity</th>
                <th className="py-2 px-4 border-r">Unit Price</th>
                <th className="py-2 px-4">Branch</th>
              </tr>
            </thead>
            <tbody>
              {filteredFoodItems.map(item => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 px-4 border-r">{item.name}</td>
                  <td className="py-2 px-4 border-r">{item.description}</td>
                  <td className="py-2 px-4 border-r">{item.quantity}</td>
                  <td className="py-2 px-4 border-r">{item.unitPrice.toFixed(2)}</td>
                  <td className="py-2 px-4">{branches.find(branch => branch.id === item.branchId)?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupplierInventory;
