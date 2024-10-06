import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import Logo from '../../assets/soko-kuu.png';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]); // State to store categories
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch categories from the backend API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.kelynemedia.co.ke/categories/all-categories'); // Adjust endpoint as necessary
        setCategories(response.data); // Store the fetched categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCategories();
  }, []); // Fetch once on component mount

  return (
    <div className='h-80 mb-4 bg-white rounded'>
      <h2 className='text-center text-xl font-bold'>Product Categories</h2>
      <div className='flex justify-end my-1'>
        <button className='p-1 bg-blue-400 text-white rounded mx-2'>See all</button>
      </div>
      <div className="w-full overflow-x-auto bg-sky-100 rounded-md">
        <div className="flex justify-around p-3">
          {loading ? (
            // Placeholder for loading state
            Array.from({ length: 8 }).map((_, index) => (
              <CategoryCard key={index} name="Loading..." banner={Logo} loading />
            ))
          ) : (
            categories.map((category) => (
              <CategoryCard
                key={category.category_id}
                name={category.category_name}
                banner={category.banner || Logo} // Use default Logo if banner is missing
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;
