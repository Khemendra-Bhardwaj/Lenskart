// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/shop" elemsent={<Shop />} /> */}
        {/* <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;