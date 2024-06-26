import React, { useState } from 'react';
import Sidebar from '../sidebar';

const ManageWaiters = () => {
  // Dummy data for initial list of waiters
  const initialWaiters = [
    { id: 1, name: 'Michael Scott', email: 'michael.scott@example.com', contact: '123-456-7890', address: '123 Dunder St', password: 'dundermifflin' },
    { id: 2, name: 'Pam Beesly', email: 'pam.beesly@example.com', contact: '987-654-3210', address: '456 Dunder St', password: 'paper' },
    // Add more dummy data as needed
  ];

  // State to manage waiters
  const [waiters, setWaiters] = useState(initialWaiters);

  // State for form inputs
  const [waiterName, setWaiterName] = useState('');
  const [waiterEmail, setWaiterEmail] = useState('');
  const [waiterContact, setWaiterContact] = useState('');
  const [waiterAddress, setWaiterAddress] = useState('');
  const [waiterPassword, setWaiterPassword] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editWaiterId, setEditWaiterId] = useState(null);

  // Function to handle editing a waiter
  const handleEditWaiter = (id) => {
    const waiterToEdit = waiters.find(waiter => waiter.id === id);
    if (waiterToEdit) {
      setWaiterName(waiterToEdit.name);
      setWaiterEmail(waiterToEdit.email);
      setWaiterContact(waiterToEdit.contact);
      setWaiterAddress(waiterToEdit.address);
      setWaiterPassword(waiterToEdit.password);
      setEditMode(true);
      setEditWaiterId(id);
    }
  };

  // Handle form submission for adding/editing a waiter
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode && editWaiterId !== null) {
      // Update existing waiter
      const updatedWaiters = waiters.map(waiter =>
        waiter.id === editWaiterId ? { ...waiter, name: waiterName, email: waiterEmail, contact: waiterContact, address: waiterAddress, password: waiterPassword } : waiter
      );
      setWaiters(updatedWaiters);
      setEditMode(false);
      setEditWaiterId(null);
    } else {
      // Add new waiter
      const newWaiter = {
        id: waiters.length + 1,
        name: waiterName,
        email: waiterEmail,
        contact: waiterContact,
        address: waiterAddress,
        password: waiterPassword
      };
      setWaiters([...waiters, newWaiter]);
    }
    // Clear form inputs
    setWaiterName('');
    setWaiterEmail('');
    setWaiterContact('');
    setWaiterAddress('');
    setWaiterPassword('');
  };

  // Function to handle deleting a waiter
  const handleDeleteWaiter = (id) => {
    const updatedWaiters = waiters.filter(waiter => waiter.id !== id);
    setWaiters(updatedWaiters);
  };

  // Function to handle cancelling edit mode
  const cancelEditMode = () => {
    setEditMode(false);
    setEditWaiterId(null);
    setWaiterName('');
    setWaiterEmail('');
    setWaiterContact('');
    setWaiterAddress('');
    setWaiterPassword('');
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 p-8 h-screen w-9/12">
        <h2 className="text-2xl font-bold mb-4">Manage Waiters</h2>

        {/* Form to add or edit a waiter */}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
            <input
              type="text"
              placeholder="Waiter Name"
              value={waiterName}
              onChange={(e) => setWaiterName(e.target.value)}
              className="border rounded py-2 px-3"
              required
            />
            <input
              type="email"
              placeholder="Waiter Email"
              value={waiterEmail}
              onChange={(e) => setWaiterEmail(e.target.value)}
              className="border rounded py-2 px-3"
              required
            />
            <input
              type="text"
              placeholder="Contact Number"
              value={waiterContact}
              onChange={(e) => setWaiterContact(e.target.value)}
              className="border rounded py-2 px-3"
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={waiterAddress}
              onChange={(e) => setWaiterAddress(e.target.value)}
              className="border rounded py-2 px-3"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={waiterPassword}
              onChange={(e) => setWaiterPassword(e.target.value)}
              className="border rounded py-2 px-3"
              required
            />
            {editMode ? (
              <div className="flex space-x-4 mt-2 md:mt-0">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={cancelEditMode}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                Add Waiter
              </button>
            )}
          </div>
        </form>

        {/* Display table of waiters */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="text-left py-2 px-4">Name</th>
                <th className="text-left py-2 px-4">Email</th>
                <th className="text-left py-2 px-4">Contact</th>
                <th className="text-left py-2 px-4">Address</th>
                <th className="text-left py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {waiters.map(waiter => (
                <tr key={waiter.id} className="border-b border-gray-200">
                  <td className="py-2 px-4">{waiter.name}</td>
                  <td className="py-2 px-4">{waiter.email}</td>
                  <td className="py-2 px-4">{waiter.contact}</td>
                  <td className="py-2 px-4">{waiter.address}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleEditWaiter(waiter.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteWaiter(waiter.id)}
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

export default ManageWaiters;
