import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 flex-shrink-0">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <ul className="mt-6">
          <li>
            <Link to="/admin/branches" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
              Manage Branches
            </Link>
          </li>
          <li>
            <Link to="/admin/add-manager" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
              Add Manager
            </Link>
          </li>
          <li>
            <Link to="/admin/add-waiter" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
              Add Waiter
            </Link>
          </li>
          <li>
            <Link to="/admin/add-chef" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
              Add Chef
            </Link>
          </li>
          <li>
            <Link to="/admin/add-supplier" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
              Add Supplier
            </Link>
          </li>
          <li>
            <Link to="/admin/manage-inventory" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
              Manage Inventory
            </Link>
          </li>
          <li>
            <Link to="/admin/manage-menuitems" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
              Manage Menu Items
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
