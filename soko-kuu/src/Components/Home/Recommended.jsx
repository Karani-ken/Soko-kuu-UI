import React, { useEffect, useState } from 'react';
import ProductCard from '../Products/ProductCard';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Recommended = () => {
  const [products, setProducts] = useState([]); // State to store all products
  const [randomProducts, setRandomProducts] = useState([]); // State to store random products
  const [loading, setLoading] = useState(true); // State for loading

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.kelynemedia.co.ke/products/all');
        setProducts(response.data); // Store the fetched products
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Set loading to false once fetching is complete
      }
    };

    fetchProducts();
  }, []);

  // Shuffle products and set random products
  useEffect(() => {
    if (products.length > 0) {
      const shuffledProducts = [...products].sort(() => 0.5 - Math.random()); // Shuffle the products
      setRandomProducts(shuffledProducts.slice(0, 10)); // Get the first 10 products
    }
  }, [products]);

  return (
    <div className='bg-white text-center my-10 py-4'>
      <h1 className='text-center font-bold text-xl'>Recommended Products</h1>
      <div className='flex justify-end my-1'>
        <Link to='/all-products'>
          <button className='p-1 bg-blue-400 text-white rounded mx-2'>See all</button>
        </Link>
      </div>
      <div className='bg-blue-900 p-5 w-full rounded flex justify-around overflow-x-scroll h-72'>
        {loading ? (
          // Render empty ProductCards while loading
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className='min-w-48 mx-5 rounded max-w-64 bg-white text-left shadow-sm h-56 border'>
              <div className='max-h-56 bg-gray-300 animate-pulse'></div> {/* Placeholder for image */}
              <h2 className='p-1 font-medium whitespace-nowrap overflow-hidden text-ellipsis'>Loading...</h2>
              <h1 className='font-black p-1 text-xl'>Kes ...</h1>
            </div>
          ))
        ) : (
          randomProducts.length > 0 ? (
            randomProducts.map((product) => (
              <ProductCard key={product.id} product={product} /> // Pass the product to ProductCard
            ))
          ) : (
            <p className='text-white'>No products available.</p>
          )
        )}
      </div>
    </div>
  );
};

export default Recommended;
