import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import Logo from '../../assets/soko-kuu.png';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]); // State to store categories
  const [loading, setLoading] = useState(true); // Loading state

  // Function to shuffle categories
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Fetch categories from the backend API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.kelynemedia.co.ke/categories/get-productcategories'); // Adjust endpoint as necessary
        const shuffledCategories = shuffleArray(response.data); // Shuffle categories
        setCategories(shuffledCategories.slice(0, 6)); // Store only the first 10 shuffled categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCategories();
  }, []); // Fetch once on component mount

  return (
    <div className=' mb-2 bg-white rounded'>
      <div className="w-full overflow-x-auto h-64 bg-sky-100 rounded-md">
        <Link to='/all-categories' className='flex justify-end my-1 p-1 font-bold '>
          See all
        </Link>
        <div className="flex justify-around p-2">
          {loading ? (
            // Placeholder for loading state
            Array.from({ length: 10 }).map((_, index) => (
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
