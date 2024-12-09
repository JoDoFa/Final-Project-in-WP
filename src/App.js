import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import { CartProvider, CartContext } from './CartContext'; // Import CartContext

// Component imports
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Account from './pages/Account';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import OrderHistory from './pages/OrderHistory';

function App() {
  const Navbar = () => {
    const { cart } = useContext(CartContext); // Access cart from CartContext

    return (
      <header className="App-header">
        <img src="https://www.creativefabrica.com/wp-content/uploads/2021/12/01/Skincare-Logo-Design-Graphics-21027211-1-1-580x387.png" alt="Logo" className="logo" />
        <h1>SSF Flair</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li>
              <Link to="/cart">
                Cart
                {cart.length > 0 && ( // Show badge if cart is not empty
                  <span className="cart-badge">{cart.length}</span>
                )}
              </Link>
            </li>
            <li><Link to="/account">Account</Link></li>
            <li><Link to="/orders">Order History</Link></li>
          </ul>
        </nav>
      </header>
    );
  };

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar /> {/* Add the Navbar component */}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/account" element={<Account />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/orders" element={<OrderHistory />} /> {/* Add OrderHistory route */}
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
