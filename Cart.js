import React, { useState, useEffect, useCallback } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Load selected items from localStorage when the component mounts
  useEffect(() => {
    const savedSelectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    setSelectedItems(savedSelectedItems);
  }, []);

  // Save selectedItems to localStorage every time it changes
  useEffect(() => {
    if (selectedItems.length > 0) {
      localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    }
  }, [selectedItems]);

  // Calculate total price of selected items
  const calculateTotal = useCallback(() => {
    const selected = selectedItems
      .map((index) => cart[index]) // Get selected products by index
      .filter(Boolean); // Filter out any null or undefined values

    const newTotal = selected.reduce(
      (sum, item) =>
        sum + (parseFloat(item?.price) || 0) * (item?.quantity || 1), // Handle invalid price or quantity
      0
    );

    setTotal(newTotal);
  }, [cart, selectedItems]);

  // Handle item selection (checkbox toggle)
  const handleSelectItem = (index) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(index)
        ? prevSelectedItems.filter((i) => i !== index) // Deselect the item
        : [...prevSelectedItems, index] // Select the item
    );
  };

  // Recalculate total whenever cart or selectedItems changes
  useEffect(() => {
    calculateTotal();
  }, [cart, selectedItems, calculateTotal]);

  // Handle checkout action
  const handleCheckout = () => {
    const selectedProducts = selectedItems.map((i) => cart[i]);
    navigate('/checkout', { state: { selectedProducts, total } });
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
                <p>${parseFloat(item?.price) ? parseFloat(item?.price).toFixed(2) : '0.00'}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="cart-item-actions">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(index)}
                  onChange={() => handleSelectItem(index)}
                />
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(index)}
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
          disabled={selectedItems.length === 0}
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