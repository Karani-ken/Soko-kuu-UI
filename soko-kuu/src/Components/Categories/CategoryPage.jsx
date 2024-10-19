import React, { useEffect, useState } from 'react';
import { useParams,useLocation,Link } from 'react-router-dom';
import axios from 'axios';

import ProductCard from '../Products/ProductCard';

const CategoryPage = () => {
  const { category } = useParams(); // Get category from URL params
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true); // Loading state
  const location = useLocation();


  const banner = location.state?.banner
  // Fetch products in this category from the endpoint
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get(`https://api.kelynemedia.co.ke/products/category/${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchCategoryProducts();
  }, [category]);

  // Render loading skeleton (empty product cards) while loading
  const renderLoadingSkeleton = () => (
    <div className='flex w-full justify-around overflow-x-auto py-2'>
      {Array(4).fill(0).map((_, index) => (
        <div key={index} className='w-40 h-60 bg-gray-300 animate-pulse rounded-md' />
      ))}
    </div>
  );

  return (
    <div className='min-h-screen'>
      {/* Category Banner */}
      <div
        className='bg-slate-100 w-full h-72 mt-4 shadow-md border rounded'
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className='text-center text-white bg-blue-900 rounded-sm lg:mx-96 my-8 font-bold p-3'>
          {category ? category.replace('-', ' ') : 'Category'}
        </h1>
      </div>

      {/* Top Products Section */}
      <div className='bg-slate-100  bg-opacity-50 border mx-0 md:mx-0 lg:mx-20  mt-[-50%] md:mt-[-15%] rounded-md md:p-3'>
        <h1 className='text-center text-black font-bold mb-4 lg:mx-80 rounded'>
          Top Products
        </h1>
        {/* Show loading skeleton if data is loading */}
        {loading ? (
          renderLoadingSkeleton()
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-10 overflow-x-auto py-2'>
            {products.length > 0 ? (
              products.slice(0, 4).map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))
            ) : (
              <p className='text-center text-gray-500'>No products found</p>
            )}
          </div>
        )}
      </div>

      {/* Recommended Products Section */}
      <div className='bg-white mb-4'>
        <h1 className='text-center font-bold my-2'>Recommended Products in this category</h1>
       
        {/* Show loading skeleton if data is loading */}
        {loading ? (
          renderLoadingSkeleton()
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 w-full  overflow-x-auto p-2 rounded-md'>
            {products.length > 0 ? (
              products.slice(4).map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))
            ) : (
              <p className='text-center text-gray-500'>No recommended products found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
