import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryCard from './CategoryCard'; // Assuming there's a CategoryCard component

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [searchTerm, setSearchTerm] = useState('');

  // Function to fetch categories from the backend API
  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://api.kelynemedia.co.ke/categories/all-categories'); // Update with the correct API endpoint
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to sort categories alphabetically A-Z or Z-A
  const handleSortOrder = (order) => {
    const sortedCategories = [...categories].sort((a, b) => {
      const nameA = a.category_name.toLowerCase();
      const nameB = b.category_name.toLowerCase();
      if (order === 'A-Z') {
        return nameA.localeCompare(nameB);
      } else if (order === 'Z-A') {
        return nameB.localeCompare(nameA);
      }
      return 0;
    });
    setSortOrder(order);
    setCategories(sortedCategories);
  };

  // Function to filter categories based on search term
  const handleSearch = () => {
    const filteredCategories = categories.filter((category) =>
      category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCategories(filteredCategories);
  };

  return (
    <div className='min-h-screen my-5'>
      <h1 className='text-center font-bold'>All Categories</h1>
      {/* Navigation Bar */}
      <div className="flex flex-col md:flex-row justify-between border py-2 shadow-md items-center mb-5 px-4 md:px-1">
        {/* Sort Options */}
        <div className="flex space-x-2 md:space-x-4 mb-3 md:mb-0">
          <button
            className={`px-3 py-2 border rounded ${sortOrder === 'A-Z' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
            onClick={() => handleSortOrder('A-Z')}
          >
            A-Z
          </button>
          <button
            className={`px-3 py-2 border rounded ${sortOrder === 'Z-A' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
            onClick={() => handleSortOrder('Z-A')}
          >
            Z-A
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex space-x-2 md:space-x-4">
          <input
            type="text"
            placeholder="Search Categories"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded w-28 md:w-32"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Search
          </button>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="text-center">Loading categories...</div>
      ) : (
        // Category Grid
        <div className="grid grid-cols-2 sm:grid-cols-2 bg-slate-100 p-2 rounded-md md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-10 lg:gap-10 px-4 md:px-0">
          {categories.length > 0 ? (
            categories.map((category) => (
              <CategoryCard key={category.categor_id} category={category} name={category.category_name}
              banner={category.banner || Logo}  />
            ))
          ) : (
            <div className="text-center col-span-full">No categories found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllCategories;
