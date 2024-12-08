import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



// Products Categories
const categories = [
  {
    category: "Face Care",
    products: [
      {
        id: 1,
        name: "Cica Glow Serum",
        price: "$35.00",
        description: "This serum is designed to hydrate and brighten your skin with its unique blend of Cica extract.",
        image: "https://naturerepublic.com.ph/cdn/shop/files/NE0637_04.jpg?v=1683965556/300x200", 
      },
      {
        id: 2,
        name: "Elf Skin Hydrating Moisturizer",
        price: "$45.00",
        description: "This moisturizer provides long-lasting hydration, leaving your skin soft and smooth.",
        image: "https://www.rankandstyle.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Frns-dev%2Fmedia%2Fd0757c27-edbf966e-hero-(77).png&w=640&q=75/300x200",
      },
      {
        id: 3,
        name: "Saffron Charcoal Facial Mask",
        price: "$28.00",
        description: "This facial mask contains activated charcoal, known for its ability to deeply cleanse and detoxify your skin.",
        image: "https://saffronskincare.pk/cdn/shop/files/charcoalpeel1.jpg?v=1689235325&width=713/300x200"
      },
      {
        id: 4,
        name: "Shubhr Eladi Brightening Day Cream",
        price: "$38.00",
        description: "This day cream helps brighten and even out your skin tone, giving you a radiant complexion.",
        image: "https://cdn.shopify.com/s/files/1/0524/2126/3532/files/Eladi_630_x_427.jpg?v=1666853152/300x200"
      },
      {
        id: 5,
        name: "Nuxuriance Ultra Anti-aging Cream",
        price: "$55.00",
        description: "This anti-aging cream is designed to reduce fine lines and wrinkles, restoring a youthful appearance.",
        image: "https://uk.nuxe.com/cdn/shop/articles/nuxe_mag-creme_anti-rides_efficace_1200x672-1.jpg?v=1718120482&width=2048/300x200"
      },
      {
        id: 6,
        name: "Glitz Vitamin C Serum",
        price: "$42.00",
        description: "This Vitamin C serum helps brighten your complexion and reduce the appearance of dark spots.",
        image: "https://136257520.cdn6.editmysite.com/uploads/1/3/6/2/136257520/s935418478965269894_p375_i3_w1707.jpeg?width=2400&optimize=medium/300x200"
      },
    ],
  },
  {
    category: "Body Care",
    products: [
      {
        id: 7,
        name: "Soothing Body Lotion",
        price: "$25.00",
        description: "This soothing body lotion helps keep your skin hydrated and soft.",
        image: "https://i0.wp.com/www.98fields.com/wp-content/uploads/2021/01/rainforest-body-lotion.jpg?fit=1080%2C1080&ssl=1/300x200"
      },
      {
        id: 8,
        name: "Salt Scrub Green Tea",
        price: "$40.00",
        description: "This exfoliating scrub, enriched with green tea, gently removes dead skin cells.",
        image: "https://cosmeticom.gr/cdn/shop/products/Screenshot_20210411-000519_Instagram_1000x.jpg?v=1666391527/300x200"
      },
      {
        id: 9,
        name: "Intensive Hand Cream",
        price: "$18.00",
        description: "This hand cream provides deep hydration and nourishment to dry hands.",
        image: "https://www.duit.com.au/wp-content/webpc-passthru.php?src=https://www.duit.com.au/wp-content/uploads/2017/07/GT-600x600.jpg&nocache=1/300x200"
      },
      {
        id: 10,
        name: "Ultra Rich Hydrating Body Butter",
        price: "$50.00",
        description: "This body butter deeply moisturizes and hydrates your skin, leaving it soft and smooth.",
        image: "https://azafran.in/cdn/shop/products/7-_1_-New_700x.jpg?v=1676866426/300x200"
      },
      {
        id: 11,
        name: "Green Apple Sugar Scrub",
        price: "$35.00",
        description: "This green apple sugar scrub exfoliates and refreshes your skin, leaving it feeling soft.",
        image: "https://amaninco.com/cdn/shop/products/20220827_225020_0005_1000x1000.png?v=1662408932/300x200"
      },
      {
        id: 12,
        name: "Aloe Vera Gel",
        price: "$18.00",
        description: "This aloe vera gel is perfect for soothing and moisturizing the skin.",
        image: "https://pharmalead.gr/wp-content/uploads/2023/07/Pharmalead_AloeVeraGel_V3.jpg/300x200"
      },
    ],
  },
  {
    category: "Hair Care",
    products: [
      {
        id: 13,
        name: "Scalp Refreshing 2 in 1 Shampoo & Conditioner",
        price: "$18.00",
        description: "The Scalp Refreshing 2 in 1 Shampoo & Conditioner cleanses and nourishes your scalp while providing hydration and refreshment for your hair.",
        image: "https://www.nativecos.com/cdn/shop/files/Stilllife_PDP_2in1_EucMint_2_6532b4e4-9135-477a-970a-47aef8f44e25_1240x1550_crop_center.jpg?v=1714486870/300x200"
      },
      {
        id: 14,
        name: "Shea Intense Repair Conditioner",
        price: "$18.00",
        description: "The Shea Intense Repair Conditioner deeply moisturizes and repairs dry or damaged hair, leaving it soft and manageable.",
        image: "https://thebodyshop.com.ph/cdn/shop/products/TBS_Conditioner_Shea_2_2048x.jpg?v=1656587082/300x200 "
      },
      {
        id: 15,
        name: "Growth Complex Salt Free Hair Mask",
        price: "$18.00",
        description: "The Growth Complex Salt Free Hair Mask nourishes and strengthens hair, promoting growth while being gentle on the scalp with no salt.",
        image: "https://naturespell.co.uk/cdn/shop/files/NS_GrowthComplexSaltFreeHairMask_Haircare_Ingredient.jpg?crop=center&height=2000&v=1720105425&width=2000/300x200"
      },
      {
        id: 16,
        name: "Herbal Hair Growth Serum",
        price: "$18.00",
        description: "The Herbal Hair Growth Serum stimulates hair growth, strengthens hair follicles, and improves overall scalp health.",
        image: "https://naturallyazelia.com/cdn/shop/products/image_e7fb729d-160c-46ac-a13d-c9160f760b55_900x.jpg?v=1670126171/300x200"
      },
      {
        id: 17,
        name: "Detox Dry Shampoo",
        price: "$18.00",
        description: "Detox Dry Shampoo refreshes hair by absorbing excess oil, leaving it clean and volumized without the need for water.",
        image: "https://www.usatoday.com/gcdn/presto/2019/09/26/USAT/8c614342-db16-477b-85f8-2bafc931d972-drybar.jpg?crop=2989,2242,x400,y0/300x200" 
      },
      {
        id: 18,
        name: "Intense Nourishing Leave-In Conditioner",
        price: "$18.00",
        description: "Intense Nourishing Leave-In Conditioner deeply hydrates and nourishes hair, leaving it smooth, soft, and manageable without rinsing.",
        image: "https://themanechoice.com/cdn/shop/products/TMC-H2Oh-Leave-In-Conditioner-Water-Drops_720x.jpg?v=1640112497/300x200"
      },
    ],
  },
];

function Products() {
  // State for the selected product to show in the modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // State to track quantity
  const navigate = useNavigate();

  // Function to show product details in the modal
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setQuantity(1); // Reset quantity to 1 when viewing a new product
  };

  // Close the modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  // Handle quantity change
  const handleQuantityChange = (event) => {
    const value = event.target.value;
    setQuantity(value > 0 ? parseInt(value) : 1); // Ensure quantity is at least 1
  };

  // Function to handle Buy button click
  const handleBuyClick = (product) => {
    const orderNumber = new Date().getTime(); // Unique order number
    const purchaseDate = new Date().toLocaleString(); // Purchase date and time

    // Create an order object
    const orderData = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      orderNumber: orderNumber,
      date: purchaseDate,
      quantity: quantity,
    };

    // Get the existing orders from localStorage or initialize an empty array
    const existingOrders = JSON.parse(localStorage.getItem("purchasedProducts")) || [];
    
    // Add the new order to the array
    existingOrders.push(orderData);

    // Save the updated orders to localStorage
    localStorage.setItem("purchasedProducts", JSON.stringify(existingOrders));

    // Navigate to the Order History page
    navigate("/orders");
  };
  

  return (
    <div className="products-container">
      {/* Header Section */}
      <div className="header">
        <h1>Skincare Products</h1>
        <p>
          Explore our wide range of skincare products, categorized to help you find the perfect solution for your skin's needs!
        </p>
      </div>

      {/* Categories */}
      {categories.map((category) => (
        <div key={category.category} className="category">
          <h2>{category.category}</h2>
          <div className="product-grid">
            {category.products.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.image} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <p>{product.price}</p>
                <button onClick={() => handleViewDetails(product)}>View Details</button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal */}
      {selectedProduct && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeModal}>×</span>
            <h2>{selectedProduct.name}</h2>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="modal-product-image"
            />
            <p>{selectedProduct.description}</p>
            <p className="product-price">{selectedProduct.price}</p>
            
            {/* Quantity input */}
            <div className="quantity-container">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max="10"
              />
            </div>

            <button className="buy-btn" onClick={() => handleBuyClick(selectedProduct)}>
              Buy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
