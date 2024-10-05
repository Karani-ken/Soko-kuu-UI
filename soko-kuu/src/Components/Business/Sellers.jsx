import React, { useEffect, useState } from 'react';
import SellerCard from './SellerCard';
import axios from 'axios';

const Sellers = () => {
  const [sellers, setSellers] = useState([]); // State to store sellers
  const [loading, setLoading] = useState(true); // State for loading

  // Fetch sellers from the API
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get('https://api.kelynemedia.co.ke/auth/users');
        const shuffledSellers = response.data.sort(() => 0.5 - Math.random()); // Shuffle sellers
        setSellers(shuffledSellers.slice(0, 10)); // Get the first 10 sellers
      } catch (error) {
        console.error('Error fetching sellers:', error);
      } finally {
        setLoading(false); // Set loading to false once fetching is complete
      }
    };

    fetchSellers();
  }, []); // Fetch once on component mount

  return (
    <div className='bg-white text-center my-10 py-4'>
      <h1 className='text-center font-bold text-xl'>Soko-kuu Sellers</h1>
      <div className='flex justify-end my-1'>
        <button className='p-1 bg-blue-400 text-white rounded mx-2'>See all</button>
      </div>
      <div className='bg-slate-100 p-5 w-full rounded flex justify-around overflow-x-scroll h-80'>
        {loading ? (
          // Render empty SellerCards while loading
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className='min-w-48 mx-5 rounded max-w-64 bg-white text-left shadow-sm h-56 border'>
              <div className='max-h-56 bg-gray-300 animate-pulse'></div> {/* Placeholder for image */}
              <h2 className='p-1 font-medium whitespace-nowrap overflow-hidden text-ellipsis'>Loading...</h2>
              <h1 className='font-black p-1 text-xl'>Seller Name</h1>
            </div>
          ))
        ) : (
          sellers.length > 0 ? (
            sellers.map((seller) => (
              <SellerCard key={seller.id} seller={seller} /> // Pass the seller to SellerCard
            ))
          ) : (
            <p className='text-gray-500'>No sellers available.</p>
          )
        )}
      </div>
    </div>
  );
};

export default Sellers;
