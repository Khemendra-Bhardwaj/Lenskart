import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Add product to cart
  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:4000/cart/add',
        { productId, quantity: 1 }, // Add 1 quantity of the product
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    }
  };

  // Add product to wishlist
  const handleAddToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:4000/wishlist/add',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Product added to wishlist!');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Failed to add product to wishlist.');
    }
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
          <button onClick={() => handleAddToWishlist(product.id)}>Add to Wishlist</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;