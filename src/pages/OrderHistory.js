import React, { useEffect, useState } from 'react';

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch the purchased products from localStorage
    const purchasedProducts = JSON.parse(localStorage.getItem("purchasedProducts")) || [];
    
    // Set the fetched products to the state
    setOrders(purchasedProducts);
  }, []);

  return (
    <div className="order-history-container">
      <h1>Order History</h1>
      
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.orderNumber}>
              <p><strong>Order Number:</strong> {order.orderNumber}</p>
              <p><strong>Product:</strong> {order.name}</p>
              <p><strong>Price:</strong> {order.price}</p>
              <p><strong>Date:</strong> {order.date}</p>
              <img src={order.image} alt={order.name} className="order-image" />
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default OrderHistory;
