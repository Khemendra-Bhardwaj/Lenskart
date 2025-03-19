import React, { useEffect, useState } from 'react';
import '../App.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('/api/cart', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => setCartItems(data))
      .catch(error => console.error('Error fetching cart items:', error));
  }, []);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <h3>{item.name}</h3>
          <p>Quantity: {item.quantity}</p>
          <button>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;