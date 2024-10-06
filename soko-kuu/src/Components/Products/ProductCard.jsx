import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/soko-kuu.png';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/products/${product.product_id}`); // Navigate to the specific product page using the product ID
  };

  // Function to safely format price with commas
  const formatPrice = (price) => {
    if (!price) return 'N/A'; // Fallback in case price is null or undefined
    return Number(price).toLocaleString('en-KE');
  };

  return (
    <div className='min-w-48 mx-5 rounded max-w-64 bg-white text-left shadow-md h-56 border cursor-pointer' onClick={handleNavigate}>
      {/* Display the first product image, or a default logo if no image is available */}
      <img
        src={product.product_images ? JSON.parse(product.product_images)[0] : Logo}
        alt={product.product_name}
        className='max-h-40 min-h-40 w-full object-cover'
      />
      {/* Display product name with overflow handling */}
      <h2 className='p-1 font-medium whitespace-nowrap overflow-hidden text-ellipsis'>{product.product_name}</h2>
      {/* Format the product price with commas */}
      <h1 className='font-black p-1 text-xl'>
        Kes {formatPrice(product.product_price)} /=
      </h1>
    </div>
  );
};

export default ProductCard;
