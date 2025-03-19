import React, { useEffect, useState } from 'react';
import '../App.css';



const ProductList = () => {

  // const handleAddToCart = async ({product}) => {
  //   try {
  //     await addToCart(product.id, 1); // Add 1 quantity of the product
  //     alert('Product added to cart!');
  //   } catch (error) {
  //     alert('Failed to add product to cart.');
  //   }
  // };


  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);
  
  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-item">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <button>Add to Cart</button>
          <button>Add to Wishlist</button>
          {/* <button onClick={handleAddToWishlist}>Add to Wishlist</button> */}

        </div>
      ))}
    </div>
  );
};

export default ProductList;