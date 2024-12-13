import React, { useEffect, useState } from 'react';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
  const [selectedOrder, setSelectedOrder] = useState(null); // To store details of the selected order
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false); // To control feedback modal visibility
  const [isCustomerFeedbackOpen, setIsCustomerFeedbackOpen] = useState(false); // To control customer feedback modal visibility
  const [feedback, setFeedback] = useState(''); // To store feedback input
  const [name, setName] = useState(''); // To store user name or anonymous option
  const [email, setEmail] = useState(''); // To store user email
  const [allFeedbacks, setAllFeedbacks] = useState([]); // To store all feedbacks
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false); // To control feedback submission modal visibility
  const [feedbackToEdit, setFeedbackToEdit] = useState(null); // For editing specific feedback

  useEffect(() => {
    // Fetch the orders from localStorage
    const purchasedProducts = JSON.parse(localStorage.getItem("purchasedProducts")) || [];
    setOrders(purchasedProducts);

    // Fetch all feedbacks from localStorage
    const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    setAllFeedbacks(feedbacks);
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

  // Handle Open Feedback Modal
  const openFeedbackModal = () => {
    setIsFeedbackOpen(true);
  };

  // Handle Open Customer Feedback Modal
  const openCustomerFeedbackModal = () => {
    setIsCustomerFeedbackOpen(true);
    setIsFeedbackOpen(false); // Close the feedback modal when viewing customer feedback
  };

  // Handle Close Feedback Modal
  const closeFeedbackModal = () => {
    setIsFeedbackOpen(false);
    setFeedback(''); // Clear feedback input
    setName(''); // Clear name input
    setEmail(''); // Clear email input
  };

  // Handle Feedback Submit
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      name: name || "Anonymous", // If no name is provided, set as "Anonymous"
      email: email || "Not provided", // If no email is provided, set as "Not provided"
      feedback,
      date: new Date().toISOString(),
    };

    // Save feedback to localStorage
    const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbacks.push(newFeedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    // Update state to reflect new feedback
    setAllFeedbacks(feedbacks);

    console.log("Feedback submitted:", newFeedback);
    setIsFeedbackSubmitted(true); // Open the feedback submission modal
    setFeedback(''); // Clear the feedback input

    // Automatically close the "Thank You" modal after 3 seconds and open the customer feedback modal
    setTimeout(() => {
      setIsFeedbackSubmitted(false); // Close the "Thank You" modal
      openCustomerFeedbackModal(); // Open the customer feedback modal
    }, 3000);
  };

  // Function to determine order status based on the order date
  const getStatus = (orderDate) => {
    const currentDate = new Date();
    const orderDateObj = new Date(orderDate);
    return orderDateObj < currentDate ? "Delivered" : "Not Delivered";
  };

  // Delete Order Function
  const handleDeleteOrder = (orderNumber) => {
    // Remove the order from the state
    const updatedOrders = orders.filter(order => order.orderNumber !== orderNumber);
    
    // Update the state
    setOrders(updatedOrders);
    
    // Update localStorage with the new list of orders
    localStorage.setItem("purchasedProducts", JSON.stringify(updatedOrders));
  };

  // Handle editing feedback
  const handleEditFeedback = (feedbackToEdit) => {
    setFeedbackToEdit(feedbackToEdit);
    setFeedback(feedbackToEdit.feedback);
    setName(feedbackToEdit.name);
    setEmail(feedbackToEdit.email);
    setIsFeedbackOpen(true); // Open feedback modal for editing
  };

  // Save edited feedback
  const handleSaveEditedFeedback = (e) => {
    e.preventDefault();
    const updatedFeedbacks = allFeedbacks.map(fb =>
      fb.date === feedbackToEdit.date ? { ...fb, feedback, name, email } : fb
    );
    localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));
    setAllFeedbacks(updatedFeedbacks);
    setIsFeedbackOpen(false);
    setFeedback('');
    setName('');
    setEmail('');
  };

  // Handle removing feedback
  const handleRemoveFeedback = (feedbackDate) => {
    const updatedFeedbacks = allFeedbacks.filter(fb => fb.date !== feedbackDate);
    localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));
    setAllFeedbacks(updatedFeedbacks);
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
              {/* Delete Button */}
              <button className="delete-button" onClick={() => handleDeleteOrder(order.orderNumber)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-orders">
          <h2>Welcome to our SSF Flair Shop!</h2>
          <p>Discover our collection of premium skincare products!</p>
        </div>
      )}

      {/* Modal for Order Details */}
      {isModalOpen && selectedOrder && (
        <div className="order-modal">
          <div className="modal-content">
            <h2>Order Details</h2>
            <p><strong>Order Number:</strong> {selectedOrder.orderNumber}</p>
            <p><strong>Quantity:</strong> {selectedOrder.quantity || 1}</p>
            <p><strong>Price:</strong> {selectedOrder.price}</p>
            <p><strong>Status:</strong> {getStatus(selectedOrder.date)}</p>
            <p><strong>Order Date:</strong> {selectedOrder.date}</p>
            <button className="close-modal-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {isFeedbackOpen && (
        <div className="feedback-modal">
          <div className="modal-content">
            <h2>{feedbackToEdit ? 'Edit Your Feedback' : 'Submit Your Feedback'}</h2>
            <form onSubmit={feedbackToEdit ? handleSaveEditedFeedback : handleFeedbackSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name (optional)"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email (optional)"
              />
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your experience with us..."
                rows="4"
                required
              ></textarea>
              <div className="modal-actions">
                <button type="submit">{feedbackToEdit ? 'Save Changes' : 'Submit Feedback'}</button>
                <button type="button" onClick={closeFeedbackModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Feedback Submitted Modal */}
      {isFeedbackSubmitted && (
        <div className="feedback-submitted-modal">
          <div className="modal-content">
            <h2>Thank You for Your Feedback!</h2>
            <p>Your feedback has been submitted successfully.</p>
            <button onClick={() => setIsFeedbackSubmitted(false)} className="close-modal-button">Close</button>
          </div>
        </div>
      )}

      {/* Customer Feedback Modal */}
      {isCustomerFeedbackOpen && (
        <div className="customer-feedback-modal">
          <div className="modal-content">
            <h2>Customer Feedback</h2>
            <button onClick={() => setIsCustomerFeedbackOpen(false)} className="close-modal-button">Close</button>
            {allFeedbacks.length > 0 ? (
              <ul>
                {allFeedbacks.map((fb, index) => (
                  <li key={index}>
                    <p><strong>{fb.name}</strong>: "{fb.feedback}"</p>
                    <small>{new Date(fb.date).toLocaleString()}</small>
                    <div className="feedback-actions">
                      <button onClick={() => handleEditFeedback(fb)}>Edit</button>
                      <button onClick={() => handleRemoveFeedback(fb.date)}>Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No feedbacks yet. Be the first to share your experience!</p>
            )}
          </div>
        </div>
      )}

      {/* Feedback Button */}
      <button className="feedback-button" onClick={openFeedbackModal}>Leave Feedback</button>
      <button className="feedback-button" onClick={openCustomerFeedbackModal}>View Customer Feedback</button>
    </div>
  );
}

export default OrderHistory;
