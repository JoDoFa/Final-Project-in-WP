import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Checkout() {
  const location = useLocation();
  const { selectedProducts, total } = location.state || { selectedProducts: [], total: 0 };

  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Handle Place Order button click
  const handlePlaceOrder = () => {
    setShowModal(true); // Show the success modal when order is placed
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="order-summary">
        <h3>Order Summary</h3>
        {selectedProducts.length > 0 ? (
          selectedProducts.map((product, index) => {
            if (product && product.image && product.name && product.price) {
              return (
                <div key={index} className="order-item">
                  <img src={product.image} alt={product.name} className="order-item-image" />
                  <div className="order-item-details">
                    <h4>{product.name}</h4>
                    <p>Price: ${parseFloat(product.price).toFixed(2)}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              );
            }
            return null;
          })
        ) : (
          <p>No items selected.</p>
        )}
        <p><strong>Total:</strong> ${total.toFixed(2)}</p>
      </div>

      <div className="place-order">
        <button className="place-order-button" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>

      {/* Modal for Order Success */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content show">
            <i className="fa fa-check-circle verified-icon"></i>
            <h3>Order Successful!</h3>
            <p>Your order has been placed successfully.</p>
            <button className="close-modal" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
