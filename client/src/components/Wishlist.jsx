import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Fetch wishlist items
  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/wishlist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlistItems(response.data);
      } catch (error) {
        console.error('Error fetching wishlist items:', error);
      }
    };
    fetchWishlistItems();
  }, []);

  // Remove item from wishlist
  const handleRemoveFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:4000/wishlist/remove', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { productId }, // Axios DELETE with a body requires `data`
      });
      // Update the wishlist items state by filtering out the removed item
      setWishlistItems(wishlistItems.filter((item) => item.productId !== productId));
      alert('Product removed from wishlist!');
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      alert('Failed to remove product from wishlist.');
    }
  };

  return (
    <div className="wishlist">
      <h2>Your Wishlist</h2>
      {wishlistItems.map((item) => (
  <div key={item.id} className="wishlist-item">
    <h3>{item.name}</h3>
    <p>Description: {item.description}</p>
    <p>Price: ${item.price}</p>
    <p>Stock Quantity: {item.stock_quantity}</p>
    <button onClick={() => handleRemoveFromWishlist(item.product_id)}>Remove</button>
  </div>
))}

    </div>
  );
};

export default Wishlist;