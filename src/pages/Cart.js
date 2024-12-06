import React, { useContext } from 'react';
import { CartContext } from '../CartContext'; // Adjust the path

function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2><i className="fa fa-shopping-cart"></i> Your Cart</h2>
      <p>Review the items in your cart before proceeding to checkout.</p>

      {/* Display Cart Items */}
      {cart.length === 0 ? (
        <div className="cart-empty-message">
          <p>Your cart is empty! Add some products to start shopping.</p>
        </div>
      ) : (
        <div className="cart-items-container">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <h3>{item.title}</h3>
              <p>${item.price.toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Summary</h3>
          <p>Total: ${calculateTotal()}</p>
        </div>
      )}

      {/* Cart Buttons */}
      {cart.length > 0 && (
        <div className="cart-buttons-container">
          <button className="proceed-btn">Proceed to Checkout</button>
          <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
}

export default Cart;