import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // Importing useCart
import { FaFacebook, FaInstagram } from 'react-icons/fa';

function Home() {
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Use the addToCart function from context
  const [modalData, setModalData] = useState(null); // State for modal content
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [quantity, setQuantity] = useState(1); // State to track the quantity in the modal

  const products = [
    {
      id: 1,
      name: 'La Mer Cream',
      description: 'Luxury Skincare to rejuvenate and hydrate your skin.',
      price: '$350', 
      image: 'https://www.elyswimbledon.co.uk/cdn/shop/files/la-mer-la-mer-creme-de-la-mer-moisturizing-cream-31759324315733_1600x.jpg?v=1726505068',
    },
    {
      id: 2,
      name: 'Aloe Vera Toner',
      description: 'Natural toner with aloe vera to refresh your skin.',
      price: '$20',
      image: 'https://www.garnier.co.uk/-/media/project/loreal/brand-sites/garnier/emea/uk/en-gb/articles/skin-care/ingredient/aloe-vera/aloe-veratoner-600x400.png?w=950&rev=6e84eb8db13d4b92b16b50c2fe7730e2&hash=F2FCF684D8F37E037836E86BC51FF7EE',
    },
    {
      id: 3,
      name: 'Placeholder Product',
      description: 'Effective skincare product for daily use.',
      price: '$50',
      image: 'https://images.squarespace-cdn.com/content/v1/5ea04a52b0a5f05e8cc2d566/1611804368879-LLL5S1RGGSJW72B67R5C/Screen+Shot+2021-01-27+at+10.23.47+PM.png',
    },
  ];

  const openModal = (product) => {
    setModalData(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  // Handle the "Buy Now" button click to add product to cart and order history
  const handleBuyNow = (product) => {
    const price = parseFloat(product.price.replace('$', '').trim());
    const productWithQuantity = { ...product, price, quantity };
  
    // Add the product to the cart
    addToCart(productWithQuantity);
  
    // Create an order object with all relevant order details
    const newOrder = {
      orderNumber: new Date().toISOString(), // Unique order number
      name: product.name,
      price: product.price,
      quantity,
      date: new Date().toLocaleString(),
      image: product.image,
    };
  
    // Get the existing orders or initialize an empty array if no orders exist
    const existingOrders = JSON.parse(localStorage.getItem("purchasedProducts")) || [];
  
    // Add the new order to the existing list
    existingOrders.push(newOrder);
  
    // Save the updated orders list back to localStorage
    localStorage.setItem("purchasedProducts", JSON.stringify(existingOrders));
  
    // Close the modal and navigate to the cart page
    closeModal();
    navigate('/cart');
  };
  
  

  // Increase or decrease quantity
  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change)); // Prevent quantity from going below 1
  };

  return (
    <div className="app">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-text">
          <h1>
            Discover Your Natural <span className="highlight">Glow</span>
          </h1>
          <p>Experience luxury skincare with our premium collection of natural and effective products.</p>
          <div className="button-group">
            <button onClick={() => navigate('/products')}>Shop Now</button>
            <button onClick={() => navigate('/products')}>Explore Categories</button>
            <button onClick={() => navigate('/account')}>My Account</button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://cdn.shopify.com/s/files/1/0070/7032/articles/Start-a-Skincare-Line_Islenia-Mil_Email_68bb4b03-2c18-4f2c-9f11-81dce299083a.jpg?v=1730479484&originalWidth=1848&originalHeight=782&width=1400"
            alt="Skincare line"
          />
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="featured-products">
        <h2>Featured Skin Care Products</h2>
        <div className="product-cards">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <h4>{product.price}</h4>
              <button onClick={() => openModal(product)}>View Details</button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */} 
{isModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <button
        className="close-button"
        onClick={closeModal}
      >
        &times;
      </button>
      <img src={modalData.image} alt={modalData.name} />
      <h3>{modalData.name}</h3>
      <p>{modalData.description}</p>
      <h4>{modalData.price}</h4> {/* Display the price with the dollar sign */}

      {/* Quantity Adjuster */}
      <div className="quantity-selector">
        <button onClick={() => handleQuantityChange(-1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => handleQuantityChange(1)}>+</button>
      </div>

      {/* Button to add the product to the cart and order history */}
      <button onClick={() => handleBuyNow(modalData)}>Buy Now</button>
    </div>
  </div>
)}


      {/* Footer Section */}
      <footer style={{ backgroundColor: '#f8c9c9', color: 'white', textAlign: 'center', padding: '20px', marginTop: '20px' }}>
        <div>
          <h3>SSF FLAIR</h3>
          <p>WHERE BEAUTY COMES TOGETHER</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Email: <a href="mailto:ssflair@philippines.com.ph" style={{ color: 'white' }}>ssflair@philippines.com.ph</a></p>
          <p>Phone: <a href="tel:+63288305000" style={{ color: 'white' }}>(02) 8830 5000</a></p>
        </div>
        <div>
          <h4>Follow Us</h4>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ margin: '5px' }}>
            <FaFacebook style={{ color: '#4267B2', fontSize: '30px' }} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ margin: '5px' }}>
            <FaInstagram style={{ color: '#C13584', fontSize: '30px' }} />
          </a>
        </div>
        <div>
          <p>© 2024 SSF Flair Philippines. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;