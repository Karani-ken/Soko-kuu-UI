import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LandingPage = () => {
  const [products, setProducts] = useState([]); // State to hold all products
  const [loading, setLoading] = useState(true); // Loading state
  const [currentIndex, setCurrentIndex] = useState(0); // Index of the currently displayed product
  const navigate = useNavigate();
  const prioritizedCategories = ['Fast Food'];

  // Fetch all products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`https://api.kelynemedia.co.ke/products/products/84`);
      // Filter products by prioritized categories
      const filteredProducts = response.data.filter(product =>
        prioritizedCategories.includes(product.category)
      );
      setProducts(filteredProducts); // Set the filtered products to state
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false); // Set loading to false once the fetch is done
    }
  };

  // Use effect to fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Automatically go to the next product every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 4000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [products.length]);

  // Loading state handling
  if (loading) {
    return (
      <div className='h-[70vh] bg-white flex mb-2 items-center justify-center relative w-full'>
        <div className='relative w-full flex flex-col md:flex-row bg-sky-200'>
          {/* Placeholder for product image */}
          <div className='w-full flex items-center justify-center relative'>
            <div className='w-full h-[70vh] bg-gray-300 rounded animate-pulse' />
          </div>
          <div className='absolute inset-0 flex items-center justify-center'>
            <p className='text-lg font-semibold text-gray-500'>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return <div className="text-center">No products available in prioritized categories.</div>;
  }

  const handleNavigate = (id) => {
    navigate(`/products/${id}`); // Navigate to the specific product page using the product ID
  };

  const currentProduct = products[currentIndex];

  return (
    <div className='h-[55vh] lg:h-[70vh] bg-white flex mb-2 items-center cursor-pointer justify-center relative w-full' 
         onClick={() => handleNavigate(currentProduct.product_id)} >
      <div className='relative w-full flex flex-col md:flex-row bg-sky-200'>
        {/* Product Image with Overlay */}
        <div className='w-full flex items-center justify-center relative'>
          <img
            src={currentProduct.product_images ? JSON.parse(currentProduct.product_images)[0] : ''}
            alt={currentProduct.product_name}
            className='w-full h-[55vh] lg:h-[70vh] object-fill rounded'
          />          
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
