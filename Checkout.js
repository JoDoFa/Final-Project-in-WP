import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Checkout() {
  const location = useLocation();
  const { selectedProducts, total } = location.state || { selectedProducts: [], total: 0 };

  const [checkedItems, setCheckedItems] = useState([]); // State to track selected checkboxes
  const [finalTotal, setFinalTotal] = useState(total); // State to update total dynamically

  // Update the total whenever selected items change
  useEffect(() => {
    const selectedProductsArray = selectedProducts.filter((product, index) => checkedItems.includes(index));
    const newTotal = selectedProductsArray.reduce(
      (sum, product) => sum + (parseFloat(product.price) || 0) * (product.quantity || 1),
      0
    );
    setFinalTotal(newTotal);
  }, [checkedItems, selectedProducts]);

  // Handle checkbox selection/deselection
  const handleCheckboxChange = (index) => {
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(index)) {
        return prevCheckedItems.filter((i) => i !== index); // Deselect the item
      } else {
        return [...prevCheckedItems, index]; // Select the item
      }
    });
  };

  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate(); // To navigate to Order History page and Cart page

  // Handle Place Order button click
  const handlePlaceOrder = () => {
    if (checkedItems.length > 0) {
      const newOrder = {
        id: new Date().toISOString(),  // Unique order ID
        products: selectedProducts.filter((_, index) => checkedItems.includes(index)),  // Store the selected products
        total: finalTotal,
        date: new Date().toLocaleString(),  // Store the current date/time
      };
  
      // Get existing orders or initialize an empty array
      const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
  
      // Add the new order to the list
      orders.push(newOrder);
  
      // Save the updated orders list to localStorage
      localStorage.setItem('orderHistory', JSON.stringify(orders));
  
      setShowModal(true);  // Show success modal
      setTimeout(() => {
        navigate('/orders');  // Redirect to orders page after 3 seconds
      }, 3000);
    }
  };

  // Handle "Go Back to Cart" button click
  const handleGoBackToCart = () => {
    navigate('/cart'); // Navigate back to the cart page
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
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(index)} // Ensure checkbox reflects the state of selection
                    onChange={() => handleCheckboxChange(index)} // Toggle item selection
                  />
                  {/* Check if image exists */}
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="order-item-image" />
                  ) : (
                    <span>No image available</span> // Placeholder if no image is available
                  )}
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
        <p><strong>Total:</strong> ${finalTotal.toFixed(2)}</p>
      </div>

      <div className="place-order">
        <button 
          className={`place-order-button ${checkedItems.length === 0 ? 'disabled' : 'enabled'}`} 
          onClick={handlePlaceOrder} 
          disabled={checkedItems.length === 0}
        >
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

      {/* Go Back to Cart Button */}
      <div className="go-back-to-cart">
        <button className="back-to-cart-button" onClick={handleGoBackToCart}>
          Go Back to Cart
        </button>
      </div>
    </div>
  );
}

export default Checkout;