import React from 'react';

function Cart() {
  return (
    <div className="cart-container">
      <h2><i className="fa fa-shopping-cart"></i>Your Cart</h2>
      <p>Review the items in your cart before checkout.</p>

      {/* Cart Items */}
      <div className="cart-items-container">
        <div className="cart-item">
          <h3>Product 1</h3>
          <p>$10.00</p>
          <button>Remove</button>
        </div>
        <div className="cart-item">
          <h3>Product 2</h3>
          <p>$20.00</p>
          <button>Remove</button>
        </div>
      </div>

      {/* Cart Summary */}
      <div className="cart-summary">
        <h3>Summary</h3>
        <p>Total: $30.00</p>
      </div>

      {/* Cart Buttons */}
      <div className="cart-buttons-container">
        <button className="proceed-btn">Proceed to Checkout</button>
        <button className="clear-cart-btn">Clear Cart</button>
      </div>

      {/* Empty Cart Message */}
      <div className="cart-empty-message">
        <p>Your cart is empty!</p>
      </div>
    </div>
  );
}

export default Cart;