import React from 'react';

function OrderHistory() {
  const orders = [
    { id: 1, product: 'Cica Glow Serum', price: '$35.00' },
    { id: 2, product: 'Elf Skin Hydrating Moisturizer', price: '$45.99' },
    { id: 3, product: 'Saffron Charcoal Facial Mask', price: '$28.00' },
    { id: 4, product: 'Shubhr Eladi Brightening Day Cream', price: '$38.99' },
    { id: 5, product: 'Nuxuriance Ultra Anti-aging Cream', price: '$55.00' },
    { id: 6, product: 'Glitz Vitamin C Serum', price: '$42.99' },
    { id: 7, product: 'Soothing Body Lotion', price: '$40.99' },
    { id: 8, product: 'Salt Scrub Green Tea', price: '$40.00' },
    { id: 9, product: 'Intensive Hand Cream', price: '$18.99' },
    { id: 10, product: 'Ultra Rich Hydrating Body Butter', price: '$25.99' },
    { id: 11, product: 'Green Apple Sugar Scrub', price: '$35.00' },
    { id: 12, product: 'Aloe Vera Gel', price: '$35.00' },
    { id: 13, product: 'Scalp Refreshing 2 in 1 Shampoo & Conditioner', price: '$52.00' },
    { id: 14, product: 'Shea Intense Repair Conditioner', price: '$41.99' },
    { id: 15, product: 'Growth Complex Salt Free Hair Mask', price: '$41.99' },
    { id: 16, product: 'Herbal Hair Growth Serum', price: '$32.99' },
    { id: 17, product: 'Detox Dry Shampoo', price: '$15.99' },
    { id: 18, product: 'Intense Nourishing Leave-In Conditioner', price: '$42.99' },
  ];

  return (
    <div className="order-history-container">
      <h2><i className="fa fa-history"></i> Order History</h2>
      <p>View your past orders here.</p>
      
      <div className="order-list">
        <h3>Your Orders</h3>
        {orders.map((order) => (
          <div className="order-item" key={order.id}>
            <div className="order-info">
              Order #{order.id}: {order.product}
            </div>
            <div className="order-price">
              {order.price}
            </div>
            <button>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;