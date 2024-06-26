import React, { useState } from 'react';
import Sidebar from '../sidebar'; // Import Sidebar component

const ManageBranches = () => {
  // Dummy data for initial list of branches
  const initialBranches = [
    { id: 1, name: 'Branch A', contact: '123-456-7890', place: 'Location A' },
    { id: 2, name: 'Branch B', contact: '987-654-3210', place: 'Location B' },
    // Add more dummy data as needed
  ];

  // State to manage branches
  const [branches, setBranches] = useState(initialBranches);

  // State for form inputs
  const [branchName, setBranchName] = useState('');
  const [branchContact, setBranchContact] = useState('');
  const [branchPlace, setBranchPlace] = useState('');

  // State to manage editing
  const [editMode, setEditMode] = useState(false);
  const [editBranchId, setEditBranchId] = useState(null);

  // Function to handle editing a branch
  const handleEditBranch = (id) => {
    const branchToEdit = branches.find(branch => branch.id === id);
    if (branchToEdit) {
      setBranchName(branchToEdit.name);
      setBranchContact(branchToEdit.contact);
      setBranchPlace(branchToEdit.place);
      setEditMode(true);
      setEditBranchId(id);
    }
  };

  // Handle form submission for adding/editing a branch
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode && editBranchId !== null) {
      // Update existing branch
      const updatedBranches = branches.map(branch =>
        branch.id === editBranchId ? { ...branch, name: branchName, contact: branchContact, place: branchPlace } : branch
      );
      setBranches(updatedBranches);
      setEditMode(false);
      setEditBranchId(null);
    } else {
      // Add new branch
      const newBranch = {
        id: branches.length + 1,
        name: branchName,
        contact: branchContact,
        place: branchPlace
      };
      setBranches([...branches, newBranch]);
    }
    // Clear form inputs
    setBranchName('');
    setBranchContact('');
    setBranchPlace('');
  };

  // Function to handle deleting a branch
  const handleDeleteBranch = (id) => {
    const updatedBranches = branches.filter(branch => branch.id !== id);
    setBranches(updatedBranches);
  };

  // Function to handle cancelling edit mode
  const cancelEditMode = () => {
    setEditMode(false);
    setEditBranchId(null);
    setBranchName('');
    setBranchContact('');
    setBranchPlace('');
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 h-screen p-8">
        <h2 className="text-2xl font-bold mb-4">Manage Branches</h2>

        {/* Form to add or edit a branch */}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="Branch Name"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              className="border rounded py-2 px-3"
              required
            />
            <input
              type="text"
              placeholder="Contact Number"
              value={branchContact}
              onChange={(e) => setBranchContact(e.target.value)}
              className="border rounded py-2 px-3"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={branchPlace}
              onChange={(e) => setBranchPlace(e.target.value)}
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
                Add Branch
              </button>
            )}
          </div>
        </form>

        {/* Display list of branches */}
        <div>
          {branches.map(branch => (
            <div key={branch.id} className="border rounded p-4 mb-2">
              <h3 className="text-xl font-bold">{branch.name}</h3>
              <p>Contact: {branch.contact}</p>
              <p>Location: {branch.place}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleEditBranch(branch.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBranch(branch.id)}
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

export default ManageBranches;
