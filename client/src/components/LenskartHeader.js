import React from 'react';
// import {ProductCard} from './components/ProductCard'
import '../App.css';

const LenskartHeader = () => {
  return (
    <header className="lenskart-header">
      {/* Top Navigation */}
      <div className="top-nav">
        <div className="container">
          <nav className="links-nav">
            <a href="#" className="nav-link">Do More. Be More</a>
            <span className="divider">|</span>
            <a href="#" className="nav-link">StoreLocator</a>
            <span className="divider">|</span>
            <a href="#" className="nav-link">Singapore</a>
            <span className="divider">|</span>
            <a href="#" className="nav-link">UAE</a>
            <span className="divider">|</span>
            <a href="#" className="nav-link">John Jacobs</a>
            <span className="divider">|</span>
            <a href="#" className="nav-link">Aqualens</a>
            <span className="divider">|</span>
            <a href="#" className="nav-link">Cobrowsing</a>
            <span className="divider">|</span>
            <a href="#" className="nav-link">Engineering Blog</a>
            <span className="divider">|</span>
            <a href="#" className="nav-link">Partner With Us</a>
            <span className="divider">|</span>
            <a href="#" className="nav-link">Meet our Stars ⭐</a>
          </nav>
          <div className="contact-link">
            <a href="#" className="nav-link">Contact Us</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="container">
          <div className="logo">
            <a href="#">
              <img src="../Images/image.png" alt="Lenskart Logo" className="logo-img" />
            </a>
          </div>
          
          <div className="phone-numbers">
            <div className="phone-icon">📞</div>
            <div className="numbers">99998 99998</div>
          </div>
          
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="What are you looking for?" 
              className="search-input"
            />
          </div>
          
          <div className="user-actions">
            <a href="#" className="track-order">Track Order</a>
            <div className="sign-in">
              <a href="#">Sign In & Sign Up</a>
            </div>
            <div className="wishlist">
              <span className="badge">2</span>
              <a href="/wishlist" className="icon-link">
                <span className="icon">♡</span>
                <span className="label">Wishlist</span>
              </a>
            </div>
            <div className="cart">
              <span className="badge">1</span>
              <a href="#" className="icon-link">
                <span className="icon">🛒</span>
                <span className="label">Cart</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="main-nav">
        <div className="container">
          <nav className="category-nav">
            <a href="#" className="category-link">EYEGLASSES</a>
            <a href="#" className="category-link">SCREEN GLASSES</a>
            <a href="#" className="category-link">KIDS GLASSES</a>
            <a href="#" className="category-link">CONTACT LENSES</a>
            <a href="#" className="category-link">SUNGLASSES</a>
            <a href="#" className="category-link">HOME EYE-TEST</a>
            <a href="#" className="category-link">STORE LOCATOR</a>
          </nav>
          <div className="special-features">
            <a href="#" className="feature-button try-on">3D TRY ON</a>
            <a href="#" className="feature-button blu">BLU</a>
            <a href="#" className="feature-button gold">GOLD NEW</a>
          </div>
        </div>
      </div>
    </header>


  );
};

export default LenskartHeader;