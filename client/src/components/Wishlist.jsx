import React, { useEffect, useState } from 'react';
import axios from "axios"
import '../App.css';

const fetchWishlistItems = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get("http://localhost:4000/wishlists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Returns the list of wishlist items
  } catch (error) {
    console.error('Error fetching wishlist items:', error);
    throw error;
  }
};

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const getWishlistItems = async () => {
      try {
        const data = await fetchWishlistItems();
        setWishlistItems(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getWishlistItems();
  }, []);

  return (
    <div>
      <h2>Your Wishlist</h2>
      {wishlistItems.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;