import React, { useEffect, useState } from 'react';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
  const [selectedOrder, setSelectedOrder] = useState(null); // To store details of the selected order

  useEffect(() => {
    // Fetch the purchased products from localStorage
    const purchasedProducts = JSON.parse(localStorage.getItem("purchasedProducts")) || [];
    
    // Set the fetched products to the state
    setOrders(purchasedProducts);
  }, []);

  // Handle View Details click to open modal
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true); // Open the modal
  };

  // Handle Close modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedOrder(null); // Clear selected order
  };

  // Function to determine order status based on the order date
  const getStatus = (orderDate) => {
    const currentDate = new Date();
    const orderDateObj = new Date(orderDate);
    return orderDateObj < currentDate ? "Delivered" : "Not Delivered";
  };

  return (
    <div className="order-history-container">
      <h1>Order History</h1>
      
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.orderNumber}>
              <div className="order-details">
                <img src={order.image} alt={order.name} className="order-image" />
                <div>
                  <p><strong>Order Number:</strong> {order.orderNumber}</p>
                  <p><strong>Product:</strong> {order.name}</p>
                  <p><strong>Price:</strong> {order.price}</p>
                  <p><strong>Date:</strong> {order.date}</p>
                </div>
              </div>
              <button className="view-details-button" onClick={() => handleViewDetails(order)}>View Details</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}

      {/* Modal for Order Details */}
      {isModalOpen && selectedOrder && (
        <div className="order-modal">
          <div className="modal-content">
            <h2>Order Details</h2>
            <p><strong>Order Number:</strong> {selectedOrder.orderNumber}</p>
            <p><strong>Quantity:</strong> {selectedOrder.quantity || 1}</p> {/* If no quantity, assume 1 */}
            <p><strong>Price:</strong> {selectedOrder.price}</p>
            <p><strong>Status:</strong> {getStatus(selectedOrder.date)}</p> {/* Display status based on the date */}
            <p><strong>Order Date:</strong> {selectedOrder.date}</p>
            <button className="close-modal-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
