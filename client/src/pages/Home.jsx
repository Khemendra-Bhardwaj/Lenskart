import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Our Store</h1>
      <p>Explore our wide range of products and manage your cart and wishlist.</p>
      <div className="home-links">
        <Link to="/products" className="btn">View Products</Link>
        <Link to="/cart" className="btn">View Cart</Link>
        <Link to="/wishlist" className="btn">View Wishlist</Link>
      </div>
    </div>
  );
};

export default Home;