import React, { useState } from 'react';

const ProductCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Sample product data
  const product = {
    name: "Designer Eyeglasses",
    price: "₹2,499",
    description: "Lightweight frame with blue light filtering lenses",
    features: ["UV Protection", "Anti-glare coating", "Scratch resistant"],
    rating: 4.7,
    reviews: 128
  };

  return (
    <div 
      className="relative w-64 h-72 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center p-4">
        <img 
          src="../Images/image-copy.png" 
          alt="Product" 
          className="max-h-full object-contain"
        />
      </div>
      
      {/* Basic Info Always Visible */}
      <div className="p-3">
        <div className="font-medium text-gray-800">{product.name}</div>
        <div className="text-teal-600 font-bold">{product.price}</div>
      </div>
      
      {/* Hover Info */}
      <div 
        className={`absolute inset-0 bg-white p-4 transition-opacity duration-300 flex flex-col justify-between ${
          isHovered ? 'opacity-95' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div>
          <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
          <p className="text-teal-600 font-bold mb-2">{product.price}</p>
          <p className="text-gray-600 text-sm mb-2">{product.description}</p>
          
          <div className="mb-2">
            <div className="text-sm font-semibold mb-1">Features:</div>
            <ul className="text-xs text-gray-600">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center mb-1">
                  <span className="mr-1 text-teal-500">•</span> {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div>
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}>★</span>
              ))}
            </div>
            <span className="text-xs text-gray-600 ml-2">({product.reviews} reviews)</span>
          </div>
          <button className="w-full bg-teal-600 text-white py-2 rounded text-sm hover:bg-teal-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;