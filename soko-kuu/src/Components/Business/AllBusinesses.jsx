import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SellerCard from './SellerCard';

const AllBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [searchTerm, setSearchTerm] = useState('');

  // Function to fetch businesses from the backend API
  const fetchBusinesses = async () => {
    try {
      const response = await axios.get('https://api.kelynemedia.co.ke/auth/users'); // Update with the correct API endpoint
      setBusinesses(response.data);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch businesses on component mount
  useEffect(() => {
    fetchBusinesses();
  }, []);

  // Function to sort businesses alphabetically A-Z or Z-A
  const handleSortOrder = (order) => {
    const sortedBusinesses = [...businesses].sort((a, b) => {
      const nameA = a.business_name.toLowerCase();
      const nameB = b.business_name.toLowerCase();
      if (order === 'A-Z') {
        return nameA.localeCompare(nameB);
      } else if (order === 'Z-A') {
        return nameB.localeCompare(nameA);
      }
      return 0;
    });
    setSortOrder(order);
    setBusinesses(sortedBusinesses);
  };

  // Function to filter businesses based on search term
  const handleSearch = () => {
    const filteredBusinesses = businesses.filter((business) =>
      business.business_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBusinesses(filteredBusinesses);
  };

  return (
    <div className='min-h-screen my-5'>
      <h1 className='text-center font-bold'>All Businesses</h1>
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
            placeholder="Search Businesses"
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
        <div className="text-center">Loading businesses...</div>
      ) : (
        // Business Grid
        <div className="grid grid-cols-2 sm:grid-cols-2 bg-slate-100 p-2 rounded-md md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-4 px-4 md:px-0">
          {businesses.length > 0 ? (
            businesses.map((business) => (
              <SellerCard key={business.id} seller={business} />
            ))
          ) : (
            <div className="text-center col-span-full">No businesses found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllBusinesses;
