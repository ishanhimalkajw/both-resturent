import React from 'react';
import Sidebar from './sidebar'; // Import Sidebar component
import { Route, Switch } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 min-h-screen p-8">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <p className="text-gray-700">
          Welcome to the Admin Dashboard. Manage your branches and add managers from the sidebar.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
