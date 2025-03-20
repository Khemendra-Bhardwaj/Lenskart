import React, { useState } from 'react';
import '../App.css';

const EyewearCardsRow = () => {
    const products = [
        {
          id: 1,
          name: "Eyeglasses",
          image: "../Images/image-copy.png",
          price: "₹2,000",
          description: "Classic frames with prescription lenses",
          features: ["Lightweight frame", "Anti-glare coating", "UV protection"],
          material: "Acetate",
          colors: ["Green", "Black", "Tortoise"]
        },
        {
          id: 2,
          name: "Sunglasses",
          image: "../Images/image-copy.png",
          price: "₹2,500",
          description: "Stylish protection for sunny days",
          features: ["Polarized lenses", "100% UV protection", "Metal frame"],
          material: "Metal",
          colors: ["Gold", "Silver", "Black"]
        },
        {
          id: 3,
          name: "Screen Glasses",
          image: "../Images/image-copy.png",
          price: "₹1,800",
          description: "Reduce eye strain from digital devices",
          features: ["Blue light filtering", "No prescription", "Comfortable fit"],
          material: "TR-90",
          colors: ["Navy", "Clear", "Black"]
        },
        {
          id: 4,
          name: "Contact Lenses",
          image: "../Images/image-copy.png",
          price: "₹1,200",
          description: "Monthly disposable soft lenses",
          features: ["Breathable material", "All-day comfort", "UV protection"],
          material: "Silicone Hydrogel",
          colors: ["Clear", "Hazel", "Blue"]
        },
        {
          id: 5,
          name: "Power Sunglasses",
          image: "../Images/image-copy.png",
          price: "₹3,200",
          description: "Prescription sunglasses for outdoor activities",
          features: ["Polarized", "Impact resistant", "Scratch proof"],
          material: "Polycarbonate",
          colors: ["Green", "Gray", "Brown"]
        },
        {
          id: 6,
          name: "Progressive Lenses",
          image: "../Images/image-copy.png",
          price: "₹4,500",
          description: "Multifocal lenses for all distances",
          features: ["No visible line", "Wide field of view", "Premium quality"],
          material: "High-index",
          colors: ["Clear", "Transitions", "Tinted"]
        }
      ];


 // State to track which card is being hovered
 const [hoveredId, setHoveredId] = useState(null);

 return (
   <div className="w-full max-w-lg mx-auto py-4 px-4 bg-white">
     <div className="flex flex-col space-y-4">
       {products.map((product) => (
         <div 
           key={product.id}
           className="relative bg-white rounded-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
           onMouseEnter={() => setHoveredId(product.id)}
           onMouseLeave={() => setHoveredId(null)}
         >
           <div className="flex">
             {/* Product Image */}
             <div className="w-1/3 bg-gray-50 flex items-center justify-center p-2">
               <img 
                 src={product.image} 
                 alt={product.name} 
                 className="max-w-full max-h-32 object-contain"
               />
             </div>
             
             {/* Basic Product Info - Always Visible */}
             <div className="w-2/3 p-3">
               <div className="text-sm text-gray-500">{product.name}</div>
               <div className="font-medium text-gray-800">₹{product.price}</div>
               <div className="text-sm font-medium mt-4">{product.name}</div>
               <div className="font-medium">₹{product.price}</div>
             </div>
           </div>
           
           {/* Hover Info Overlay */}
           <div 
             className={`absolute inset-0 bg-white p-3 transition-opacity duration-300 ${
               hoveredId === product.id ? 'opacity-100 visible' : 'opacity-0 invisible'
             }`}
           >
             <div className="flex">
               <div className="w-1/3 bg-gray-50 flex items-center justify-center p-2">
                 <img 
                   src={product.image} 
                   alt={product.name} 
                   className="max-w-full max-h-32 object-contain"
                 />
               </div>
               
               <div className="w-2/3 p-3">
                 <h3 className="font-bold text-gray-800">{product.name}</h3>
                 <p className="font-medium">₹{product.price}</p>
                 <p className="text-gray-600 text-sm">{product.description}</p>
                 
                 <div className="mt-2">
                   <div className="text-sm font-semibold">Features:</div>
                   <ul className="text-xs text-gray-600">
                     {product.features.map((feature, index) => (
                       <li key={index} className="flex items-start">
                         <span className="mr-1 text-teal-500">•</span> 
                         <span>{feature}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
                 
                 <div className="text-xs mt-1">
                   <span className="font-semibold">Material:</span> {product.material}
                 </div>
                 
                 <div className="text-xs">
                   <span className="font-semibold">Colors:</span> {product.colors.join(", ")}
                 </div>
                 
                 <button className="mt-2 px-3 py-1 bg-teal-600 text-white text-xs rounded hover:bg-teal-700">
                   View Details
                 </button>
               </div>
             </div>
           </div>
         </div>
       ))}
     </div>
   </div>
 );
};
export default EyewearCardsRow;