import React, { useState, useEffect, useCallback } from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Load selected items from localStorage when the component mounts
  useEffect(() => {
    const savedSelectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    console.log('Loaded selected items from localStorage:', savedSelectedItems); // Debugging log
    setSelectedItems(savedSelectedItems); // Initialize selected items with stored data
  }, []);

  // Save selectedItems to localStorage every time it changes
  useEffect(() => {
    if (selectedItems.length > 0) {
      console.log('Saving selected items to localStorage:', selectedItems); // Debugging log
      localStorage.setItem('selectedItems', JSON.stringify(selectedItems)); // Save selected items to localStorage
    }
  }, [selectedItems]); // This effect runs whenever selectedItems state changes

  // Calculate total price of selected items
  const calculateTotal = useCallback(() => {
    const selected = selectedItems
      .map((index) => cart[index]) // Get selected products by index
      .filter(Boolean); // Filter out any null or undefined values

    const newTotal = selected.reduce(
      (sum, item) => sum + (parseFloat(item.price) || 0) * item.quantity,
      0
    );

    setTotal(newTotal); // Update the total state
  }, [cart, selectedItems]); // Recalculate when cart or selectedItems change

  // Handle item selection (checkbox toggle)
  const handleSelectItem = (index) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = prevSelectedItems.includes(index)
        ? prevSelectedItems.filter((i) => i !== index) // Deselect the item
        : [...prevSelectedItems, index]; // Select the item

      console.log('Updated selected items:', updatedSelectedItems); // Debugging log
      return updatedSelectedItems;
    });
  };

  // Recalculate total whenever cart or selectedItems changes
  useEffect(() => {
    calculateTotal();
  }, [cart, selectedItems, calculateTotal]);

  // Handle checkout action
  const handleCheckout = () => {
    const selectedProducts = selectedItems.map((i) => cart[i]); // Get selected products
    navigate('/checkout', { state: { selectedProducts, total } }); // Navigate to checkout
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>${parseFloat(item.price).toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="cart-item-actions">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(index)} // Check if item is selected
                  onChange={() => handleSelectItem(index)} // Toggle selection
                />
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(index)} // Remove item from cart
                >
                  ✖
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

      {/* Cart Summary for Selected Items */}
      <div className="cart-summary">
        <p>
          <strong>Total (Selected Items):</strong> ${total.toFixed(2)}
        </p>
      </div>

      {/* Cart Actions */}
      <div className="cart-actions">
        <button
          className="checkout-button"
          onClick={handleCheckout}
          disabled={selectedItems.length === 0} // Disable checkout if no items are selected
        >
          Checkout Selected Items
        </button>
        <button className="clear-cart-button" onClick={clearCart} disabled={cart.length === 0}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
