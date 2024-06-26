import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 flex-shrink-0">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Supplier Panel</h2>
        <ul className="mt-6">

          <li>
            <Link to="/supplier/manage-inventory" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white">
              Manage Inventory
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
