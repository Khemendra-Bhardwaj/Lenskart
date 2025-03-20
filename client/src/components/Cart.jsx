import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  // Remove item from cart
  const handleRemoveFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Removing product with ID:', productId); // Debugging
      const response = await axios.delete('http://localhost:4000/cart/remove', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { productId }, // Axios DELETE with a body requires `data`
      });


      // Update the cart items state by filtering out the removed item
      setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
      alert('Product removed from cart!');
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert('Failed to remove product from cart.');
    }
  };
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <h3>{item.name}</h3>
          <p>Quantity: {item.quantity}</p>
          {/* <button onClick={() => handleRemoveFromCart(item.productId)}>Remove</button> */}
          <button onClick={() => {
            handleRemoveFromCart(item.product_id);
          }}>
            Remove
          </button>

        </div>
      ))}
    </div>
  );
};

export default Cart;