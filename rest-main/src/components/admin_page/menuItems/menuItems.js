import React, { useState } from 'react';
import Sidebar from '../sidebar'; // Import Sidebar component

const ManageMenuItems = () => {
  // Dummy data for initial list of menu items
  const initialMenuItems = [
    { id: 1, name: 'Cheeseburger', description: 'Classic cheeseburger with cheddar cheese', price: 9.99, review: 'Delicious!', category: 'Main Course' },
    { id: 2, name: 'Caesar Salad', description: 'Fresh romaine lettuce with Caesar dressing', price: 6.99, review: 'Healthy choice', category: 'Salad' },
    // Add more dummy data as needed
  ];

  // State to manage menu items
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  // State for form inputs
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemReview, setItemReview] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  // Function to handle editing a menu item
  const handleEditItem = (id) => {
    const itemToEdit = menuItems.find(item => item.id === id);
    if (itemToEdit) {
      setItemName(itemToEdit.name);
      setItemDescription(itemToEdit.description);
      setItemPrice(itemToEdit.price.toString()); // Convert price to string for input field
      setItemReview(itemToEdit.review);
      setEditMode(true);
      setEditItemId(id);
    }
  };

  // Handle form submission for adding/editing a menu item
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode && editItemId !== null) {
      // Update existing menu item
      const updatedMenuItems = menuItems.map(item =>
        item.id === editItemId ? { ...item, name: itemName, description: itemDescription, price: parseFloat(itemPrice), review: itemReview } : item
      );
      setMenuItems(updatedMenuItems);
      setEditMode(false);
      setEditItemId(null);
    } else {
      // Add new menu item
      const newMenuItem = {
        id: menuItems.length + 1,
        name: itemName,
        description: itemDescription,
        price: parseFloat(itemPrice),
        review: itemReview,
        category: 'Unknown' // You can add category selection in future implementations
      };
      setMenuItems([...menuItems, newMenuItem]);
    }
    // Clear form inputs
    setItemName('');
    setItemDescription('');
    setItemPrice('');
    setItemReview('');
  };

  // Function to handle deleting a menu item
  const handleDeleteItem = (id) => {
    const updatedMenuItems = menuItems.filter(item => item.id !== id);
    setMenuItems(updatedMenuItems);
  };

  // Function to handle cancelling edit mode
  const cancelEditMode = () => {
    setEditMode(false);
    setEditItemId(null);
    setItemName('');
    setItemDescription('');
    setItemPrice('');
    setItemReview('');
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 min-h-screen p-8">
        <h2 className="text-2xl font-bold mb-4">Manage Menu Items</h2>

        {/* Form to add or edit a menu item */}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="border rounded py-2 px-3"
              required
            />
            <input
              type="text"
              placeholder="Item Description"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className="border rounded py-2 px-3"
              required
            />
            <input
              type="number"
              placeholder="Item Price"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              className="border rounded py-2 px-3"
              required
            />
            <input
              type="text"
              placeholder="Item Review"
              value={itemReview}
              onChange={(e) => setItemReview(e.target.value)}
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
                Add Item
              </button>
            )}
          </div>
        </form>

        {/* Display list of menu items */}
        <div>
          {menuItems.map(item => (
            <div key={item.id} className="border rounded p-4 mb-2">
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p>Description: {item.description}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Review: {item.review}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleEditItem(item.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageMenuItems;
