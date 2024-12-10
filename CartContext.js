import React, { createContext, useContext, useState } from "react";

// Create a Context for the Cart
const CartContext = createContext();

// Cart Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add product to the cart (treat each addition as a unique entry)
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]); // Each addition creates a separate entry
  };

  // Remove a specific product by index
  const removeFromCart = (productIndex) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== productIndex)); // Remove only the product at the given index
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]); // Reset the cart to an empty array
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart, // Add clearCart to the context
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart context
export const useCart = () => useContext(CartContext);
