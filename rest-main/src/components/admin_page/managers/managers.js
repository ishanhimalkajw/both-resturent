import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../sidebar'; // Import Sidebar component

const ManageManagers = () => {
  // State to manage managers
  const [managers, setManagers] = useState([]);

  // State for form inputs
  const [managerName, setManagerName] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  const [managerPassword, setManagerPassword] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editManagerId, setEditManagerId] = useState(null);

  // Fetch managers from API
  useEffect(() => {
    axios.get('http://109.199.101.207:3000/api/users')
      .then(response => setManagers(response.data))
      .catch(error => console.error('Error fetching managers:', error));
  }, []);

  // Function to handle editing a manager
  const handleEditManager = (id) => {
    const managerToEdit = managers.find(manager => manager.id === id);
    if (managerToEdit) {
      setManagerName(managerToEdit.name);
      setManagerEmail(managerToEdit.email);
      setManagerPassword(managerToEdit.password);
      setEditMode(true);
      setEditManagerId(id);
    }
  };

  // Handle form submission for adding/editing a manager
  const handleSubmit = (e) => {
    e.preventDefault();
    let managerData = {
      // Include only if not empty
      ...(managerName && { name: managerName }),
      ...(managerEmail && { email: managerEmail }),
      ...(managerPassword && { password: managerPassword })
    };

    // Log the data before updating or adding
    console.log('Submitting form...');
    if (editMode && editManagerId !== null) {
      // Log data for update
      console.log('Updating manager with ID:', editManagerId);
      console.log('Manager data:', managerData);

      // Update existing manager
      axios.put(`http://109.199.101.207:3000/api/users/${editManagerId}`, managerData)
        .then(response => {
          const updatedManagers = managers.map(manager =>
            manager.id === editManagerId ? response.data : manager
          );
          setManagers(updatedManagers);
          setEditMode(false);
          setEditManagerId(null);
        })
        .catch(error => console.error('Error updating manager:', error));
    } else {
      // Log data for add
      console.log('Adding new manager...');
      console.log('Manager data:', managerData);

      // Add new manager
      axios.post('http://109.199.101.207:3000/api/users', managerData)
        .then(response => setManagers([...managers, response.data]))
        .catch(error => console.error('Error adding manager:', error));
    }

    // Clear form inputs
    setManagerName('');
    setManagerEmail('');
    setManagerPassword('');
  };

  // Function to handle deleting a manager
  const handleDeleteManager = (id) => {
    axios.delete(`http://109.199.101.207:3000/api/users/${id}`)
      .then(() => {
        const updatedManagers = managers.filter(manager => manager.id !== id);
        setManagers(updatedManagers);
      })
      .catch(error => console.error('Error deleting manager:', error));
  };

  // Function to handle cancelling edit mode
  const cancelEditMode = () => {
    setEditMode(false);
    setEditManagerId(null);
    setManagerName('');
    setManagerEmail('');
    setManagerPassword('');
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = (id) => {
    const updatedManagers = managers.map(manager =>
      manager.id === id ? { ...manager, showPassword: !manager.showPassword } : manager
    );
    setManagers(updatedManagers);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 min-h-screen p-8">
        <h2 className="text-2xl font-bold mb-4">Manage Managers</h2>

        {/* Form to add or edit a manager */}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="Manager Name"
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              className="border rounded py-2 px-3"
              required
            />
            <input
              type="email"
              placeholder="Manager Email"
              value={managerEmail}
              onChange={(e) => setManagerEmail(e.target.value)}
              className="border rounded py-2 px-3"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={managerPassword}
              onChange={(e) => setManagerPassword(e.target.value)}
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
                Add Manager
              </button>
            )}
          </div>
        </form>

        {/* Display list of managers */}
        <div>
          {managers.map(manager => (
            <div key={manager.id} className="border rounded p-4 mb-2">
              <h3 className="text-xl font-bold">{manager.name}</h3>
              <p>Email: {manager.email}</p>
              <p>
                Password: {manager.showPassword ? manager.password : '********'}
                <button
                  onClick={() => togglePasswordVisibility(manager.id)}
                  className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
                >
                  {manager.showPassword ? 'Hide' : 'Show'}
                </button>
              </p>
              <div className="mt-2">
                <button
                  onClick={() => handleEditManager(manager.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteManager(manager.id)}
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

export default ManageManagers;
