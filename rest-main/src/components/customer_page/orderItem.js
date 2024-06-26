import React from 'react';

const OrderItem = ({ item, removeFromOrder, isOrderConfirmed }) => {
  return (
    <div className="flex justify-between border-b py-2">
      <div>
        <h4 className="text-lg">{item.Name}</h4>
        <p className="text-sm">Qty: {item.qty}</p>
      </div>
      <div>
        <p className="text-lg">${(item.Price * item.qty).toFixed(2)}</p>
        <button
          onClick={() => removeFromOrder(item)}
          className="text-red-500 hover:text-red-700 mr-2"
        >
          Remove
        </button>
        {/* Remove the order and bill buttons from here */}
      </div>
    </div>
  );
};

export default OrderItem;
