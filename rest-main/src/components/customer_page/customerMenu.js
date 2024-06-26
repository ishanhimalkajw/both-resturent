import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItemList from './menuList';
import OrderItem from './orderItem';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

// Dummy data for menu items
const dummyMenuItems = [
  {
    ItemID: 1,
    Name: 'Pizza Margherita',
    Description: 'Classic Italian pizza with tomato sauce and mozzarella cheese.',
    Price: 9.99,
  },
  {
    ItemID: 2,
    Name: 'Caesar Salad',
    Description: 'Fresh romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.',
    Price: 6.49,
  },
  {
    ItemID: 3,
    Name: 'Spaghetti Bolognese',
    Description: 'Spaghetti pasta with homemade Bolognese meat sauce.',
    Price: 11.99,
  },
  // Add more items as needed
];

const CustomerMenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [order, setOrder] = useState([]);
    const [newOrder, setNewOrder] = useState([]);
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
    const [isNewOrderConfirmed, setIsNewOrderConfirmed] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      // Dummy data initialization
      setMenuItems(dummyMenuItems);
    }, []);
  
    useEffect(() => {
      // Update isNewOrderConfirmed based on newOrder
      if (newOrder.length === 0) {
        setIsNewOrderConfirmed(false);
      }
    }, [newOrder]);
  
    const handleOrder = () => {
      setIsOrderConfirmed(true);
      
      // Prepare order data to send to the API
      const orderData = {
        userId: 1, // Replace with the actual user ID
        items: order.map(item => ({
          menuItemId: item.ItemID,
          quantity: item.qty
        }))
      };
      
      console.log(orderData)
      // Send order data to API
      axios.post('http://109.199.101.207:30000/api/menu-items', orderData)
        .then(response => {
          // Navigate to checkout page or handle success as needed
          navigate('/checkout', { state: { orderedItems: order, totalPrice: calculateTotalPrice(order) } });
        })
        .catch(error => {
          console.error('Error placing order:', error);
          // Handle error if needed
        });
    };
  
    const handleNewOrder = () => {
      setIsNewOrderConfirmed(true);
    };
  
    const handleBill = () => {
      if (!isOrderConfirmed) {
        alert("Please confirm current order before billing.");
      } else if (!isNewOrderConfirmed && newOrder.length > 0) {
        alert("Please confirm new order before billing.");
      } else {
        // Combine orders for billing
        const combinedOrder = [...order, ...newOrder];
        navigate('/checkout', { state: { orderedItems: combinedOrder, totalPrice: calculateTotalPrice(combinedOrder) } });
      }
    };
  
    const addToOrder = (item) => {
      if (isOrderConfirmed) {
        setNewOrder((prevNewOrder) => {
          const existingItem = prevNewOrder.find((orderItem) => orderItem.ItemID === item.ItemID);
          if (existingItem) {
            return prevNewOrder.map((orderItem) =>
              orderItem.ItemID === item.ItemID ? { ...orderItem, qty: orderItem.qty + 1 } : orderItem
            );
          } else {
            return [...prevNewOrder, { ...item, qty: 1 }];
          }
        });
      } else {
        setOrder((prevOrder) => {
          const existingItem = prevOrder.find((orderItem) => orderItem.ItemID === item.ItemID);
          if (existingItem) {
            return prevOrder.map((orderItem) =>
              orderItem.ItemID === item.ItemID ? { ...orderItem, qty: orderItem.qty + 1 } : orderItem
            );
          } else {
            return [...prevOrder, { ...item, qty: 1 }];
          }
        });
      }
    };
  
    const removeFromOrder = (item, fromNewOrder) => {
      if (fromNewOrder) {
        setNewOrder((prevNewOrder) =>
          prevNewOrder.filter((orderItem) => orderItem.ItemID !== item.ItemID)
        );
  
        // Check if all new order items are removed
        if (newOrder.length === 1) {
          setIsNewOrderConfirmed(false);
        }
      } else {
        setOrder((prevOrder) =>
          prevOrder.filter((orderItem) => orderItem.ItemID !== item.ItemID)
        );
      }
    };
  
    const calculateTotalPrice = (orderItems) => {
      return orderItems.reduce((acc, item) => acc + item.Price * item.qty, 0);
    };
  
    return (
      <div className="container mx-auto p-4">
        <MenuItemList menuItems={menuItems} addToOrder={addToOrder} />
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6 text-center">Your Order</h2>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {order.length === 0 && newOrder.length === 0 ? (
              <p className="text-center text-gray-700">Your order is empty</p>
            ) : (
              <div>
                {order.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold mb-2">Your Current Order:</h3>
                    {order.map((item) => (
                      <OrderItem
                        key={item.ItemID}
                        item={item}
                        removeFromOrder={() => removeFromOrder(item, false)}
                        isOrderConfirmed={isOrderConfirmed}
                      />
                    ))}
                  </div>
                )}
                {newOrder.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-bold mb-2">New Order:</h3>
                    {newOrder.map((item) => (
                      <OrderItem
                        key={item.ItemID}
                        item={item}
                        removeFromOrder={() => removeFromOrder(item, true)}
                        isOrderConfirmed={isNewOrderConfirmed}
                      />
                    ))}
                    {!isNewOrderConfirmed && (
                      <button
                        onClick={handleNewOrder}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 ml-2"
                      >
                        Confirm New Order
                      </button>
                    )}
                  </div>
                )}
                <div className="flex justify-between mt-4">
                  <p className="text-lg font-bold">Total:</p>
                  <p className="text-lg font-bold">${calculateTotalPrice([...order, ...newOrder]).toFixed(2)}</p>
                </div>
                {!isOrderConfirmed ? (
                  <button
                    onClick={handleOrder}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                  >
                    Confirm Current Order
                  </button>
                ) : (
                  <button
                    onClick={handleBill}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  >
                    Bill
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default CustomerMenuPage;
