import React from 'react';
import Wishlist from '../components/Wishlist';
import './WishlistPage.css';

const WishlistPage = () => {
  return (
    <div className="wishlist-page">
      <h1>Your Wishlist</h1>
      <Wishlist />
    </div>
  );
};

export default WishlistPage;