import React, { createContext, useContext, useState } from "react";


// Create a Context for the Cart
const CartContext = createContext();

// Cart Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
  };

  // Remove a specific product by index
  const removeFromCart = (productIndex) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== productIndex));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart context
export const useCart = () => useContext(CartContext);
