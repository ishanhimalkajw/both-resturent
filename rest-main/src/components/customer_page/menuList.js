// src/components/MenuItemList.js
import React from 'react';

const MenuItemList = ({ menuItems, addToOrder }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item.ItemID} className="border p-4 rounded shadow">
            <h3 className="text-xl font-bold">{item.Name}</h3>
            <p>{item.Description}</p>
            <p className="text-lg font-bold">${item.Price.toFixed(2)}</p>
            <button
              onClick={() => addToOrder(item)}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add to Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuItemList;
