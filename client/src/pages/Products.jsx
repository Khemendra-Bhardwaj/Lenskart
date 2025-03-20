import React from 'react';
import ProductList from '../components/ProductList';
import './Products.css';

const Products = () => {
  return (
    <div className="products-page">
      <h1>Products</h1>
      <ProductList />
    </div>
  );
};

export default Products;