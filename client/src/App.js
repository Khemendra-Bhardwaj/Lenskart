import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [activeCategory, setActiveCategory] = useState('eyeglasses');
  
  // Sample featured products
  const featuredProducts = [
    { id: 1, name: 'Vincent Chase Eyeglasses', price: 999, image: '/api/placeholder/220/220', tag: 'Bestseller' },
    { id: 2, name: 'John Jacobs Aviator', price: 1499, image: '/api/placeholder/220/220', tag: 'New' },
    { id: 3, name: 'Hooper Round', price: 1299, image: '/api/placeholder/220/220', tag: 'Trending' },
    { id: 4, name: 'Cateye Classic', price: 999, image: '/api/placeholder/220/220', tag: 'Sale' },
  ];

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-top bg-blue-900 text-white p-2 text-center text-sm">
          Free Shipping & 14-Day Returns | Use Code: WELCOME20 for 20% OFF
        </div>
        <div className="main-header flex justify-between items-center p-4 shadow-sm">
          <div className="logo font-bold text-2xl text-blue-800">LensKart</div>
          
          <div className="search-bar relative flex-1 mx-12">
            <input 
              type="text" 
              placeholder="What are you looking for?" 
              className="w-full p-2 pl-10 border border-gray-300 rounded-md"
            />
            <span className="absolute left-3 top-2.5">🔍</span>
          </div>
          
          <div className="header-actions flex gap-5">
            <div className="action-item flex flex-col items-center cursor-pointer">
              <span>👤</span>
              <span className="text-xs">Account</span>
            </div>
            <div className="action-item flex flex-col items-center cursor-pointer">
              <span>❤️</span>
              <span className="text-xs">Wishlist</span>
            </div>
            <div className="action-item flex flex-col items-center cursor-pointer">
              <span>🛒</span>
              <span className="text-xs">Cart</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="primary-nav bg-white border-b border-gray-200">
        <div className="container mx-auto">
          <ul className="flex justify-center gap-10 p-4 font-medium">
            <li className={`nav-item ${activeCategory === 'eyeglasses' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`} 
                onClick={() => setActiveCategory('eyeglasses')}>Eyeglasses</li>
            <li className={`nav-item ${activeCategory === 'sunglasses' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                onClick={() => setActiveCategory('sunglasses')}>Sunglasses</li>
            <li className={`nav-item ${activeCategory === 'computer-glasses' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                onClick={() => setActiveCategory('computer-glasses')}>Computer Glasses</li>
            <li className={`nav-item ${activeCategory === 'contact-lenses' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                onClick={() => setActiveCategory('contact-lenses')}>Contact Lenses</li>
            <li className={`nav-item ${activeCategory === 'kids-glasses' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                onClick={() => setActiveCategory('kids-glasses')}>Kids Glasses</li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="hero-banner relative rounded-lg overflow-hidden shadow-lg">
            <img src="/api/placeholder/1200/400" alt="Hero Banner" className="w-full" />
            <div className="absolute top-1/4 left-12 max-w-md">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">New Collection 2025</h2>
              <p className="text-lg text-gray-700 mb-6">Find your perfect style with our latest designer frames</p>
              <button className="bg-blue-600 text-white py-3 px-8 rounded-md font-medium hover:bg-blue-700 transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="featured-categories py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Shop By Category</h2>
          <div className="grid grid-cols-4 gap-6">
            <div className="category-card text-center cursor-pointer">
              <div className="rounded-lg overflow-hidden mb-3 shadow-md">
                <img src="/api/placeholder/280/200" alt="Men's Eyeglasses" className="w-full h-auto" />
              </div>
              <h3 className="font-medium">Men's Eyeglasses</h3>
            </div>
            <div className="category-card text-center cursor-pointer">
              <div className="rounded-lg overflow-hidden mb-3 shadow-md">
                <img src="/api/placeholder/280/200" alt="Women's Eyeglasses" className="w-full h-auto" />
              </div>
              <h3 className="font-medium">Women's Eyeglasses</h3>
            </div>
            <div className="category-card text-center cursor-pointer">
              <div className="rounded-lg overflow-hidden mb-3 shadow-md">
                <img src="/api/placeholder/280/200" alt="Premium Sunglasses" className="w-full h-auto" />
              </div>
              <h3 className="font-medium">Premium Sunglasses</h3>
            </div>
            <div className="category-card text-center cursor-pointer">
              <div className="rounded-lg overflow-hidden mb-3 shadow-md">
                <img src="/api/placeholder/280/200" alt="Computer Glasses" className="w-full h-auto" />
              </div>
              <h3 className="font-medium">Computer Glasses</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="section-header flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Bestsellers</h2>
            <a href="#" className="text-blue-600 font-medium">View All</a>
          </div>
          
          <div className="grid grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-auto" />
                  <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    {product.tag}
                  </span>
                  <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow">
                    ❤️
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">₹{product.price}</span>
                    <button className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-6">
            <div className="feature-item text-center">
              <div className="icon text-3xl mb-3">🚚</div>
              <h3 className="font-medium mb-1">Free Shipping</h3>
              <p className="text-sm text-gray-600">On all orders above ₹999</p>
            </div>
            <div className="feature-item text-center">
              <div className="icon text-3xl mb-3">🔄</div>
              <h3 className="font-medium mb-1">Easy Returns</h3>
              <p className="text-sm text-gray-600">14-day return policy</p>
            </div>
            <div className="feature-item text-center">
              <div className="icon text-3xl mb-3">🛡️</div>
              <h3 className="font-medium mb-1">Secure Payments</h3>
              <p className="text-sm text-gray-600">100% secure checkout</p>
            </div>
            <div className="feature-item text-center">
              <div className="icon text-3xl mb-3">👓</div>
              <h3 className="font-medium mb-1">Try At Home</h3>
              <p className="text-sm text-gray-600">Virtual try-on available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-gray-800 text-white pt-10 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div className="footer-col">
              <h4 className="text-lg font-medium mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Eyeglasses</li>
                <li>Sunglasses</li>
                <li>Computer Glasses</li>
                <li>Contact Lenses</li>
                <li>Kids Glasses</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="text-lg font-medium mb-4">Help</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Track Order</li>
                <li>Returns & Exchange</li>
                <li>Shipping Policy</li>
                <li>Warranty</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="text-lg font-medium mb-4">About Us</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Our Story</li>
                <li>Store Locator</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="text-lg font-medium mb-4">Connect With Us</h4>
              <div className="social-icons flex gap-4 mb-4">
                <span className="cursor-pointer">📱</span>
                <span className="cursor-pointer">📘</span>
                <span className="cursor-pointer">📸</span>
                <span className="cursor-pointer">🐦</span>
              </div>
              <div className="newsletter">
                <h5 className="text-sm font-medium mb-2">Subscribe to our newsletter</h5>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="p-2 text-black rounded-l-md w-full"
                  />
                  <button className="bg-blue-600 p-2 rounded-r-md">
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
            <p>© 2025 OpticStyle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;