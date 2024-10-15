import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from './ServiceCard'; // Assuming there's a ServiceCard component

const AllServices = () => {
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [services, setServices] = useState([]);
  const [allServices, setAllServices] = useState([]); // Store original services
  const [loading, setLoading] = useState(true);

  // Function to fetch services from the backend API
  const fetchServices = async () => {
    try {
      const response = await axios.get('https://api.kelynemedia.co.ke/services/all'); // Update API endpoint
      setServices(response.data); // Set initial services for display
      setAllServices(response.data); // Store all services for filtering
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  // Function to sort services alphabetically A-Z or Z-A
  const handleSortOrder = (order) => {
    const sortedServices = [...services].sort((a, b) => {
      const nameA = a.service_name.toLowerCase();
      const nameB = b.service_name.toLowerCase();
      if (order === 'A-Z') {
        return nameA.localeCompare(nameB);
      } else if (order === 'Z-A') {
        return nameB.localeCompare(nameA);
      }
      return 0;
    });
    setSortOrder(order);
    setServices(sortedServices);
  };

  // Function to filter services by price range
  const handlePriceFilter = () => {
    const filteredServices = allServices.filter((service) => {
      const price = Number(service.service_price); // Assuming service_price is a number
      const isAboveMin = !minPrice || price >= Number(minPrice);
      const isBelowMax = !maxPrice || price <= Number(maxPrice);
      return isAboveMin && isBelowMax;
    });
    setServices(filteredServices);
  };

  return (
    <div className='min-h-screen my-5'>
      <h1 className='text-center font-bold'> All Services</h1>
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

        {/* Price Filter */}
        <div className="flex space-x-2 md:space-x-4">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="px-4 py-2 border rounded w-28 md:w-32"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="px-4 py-2 border rounded w-28 md:w-32"
          />
          <button
            onClick={handlePriceFilter}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="text-center">Loading services...</div>
      ) : (
        // Service Grid
        <div className="grid grid-cols-2 sm:grid-cols-2 bg-slate-100 p-2 rounded-md md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-4 px-4 md:px-0">
          {services.length > 0 ? (
            services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))
          ) : (
            <div className="text-center col-span-full">No services found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllServices;
