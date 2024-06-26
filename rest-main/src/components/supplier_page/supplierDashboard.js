import React from 'react';
import Sidebar from './sidebar';

const SupplierDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 min-h-screen p-8">
        <h2 className="text-2xl font-bold mb-4">Supplier Dashboard</h2>
        <p className="text-gray-700">
          Welcome to the Supplier Dashboard. Manage your inventory from the sidebar.
        </p>
      </div>
    </div>
  );
};

export default SupplierDashboard;
