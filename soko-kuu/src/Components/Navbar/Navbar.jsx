import React, { useState } from 'react';
import Logo from '../../assets/soko-kuu.png';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div>
      {/* Header */}
      <header className='bg-blue-900 text-white md:flex justify-evenly p-2 text-center rounded-sm'>
        <h1 className='font-medium text-sm sm:text-base md:text-lg lg:text-xl'>
          Offer! Offer! Offer! Get Amazing deals at Soko-Kuu
        </h1>
        <div className='flex justify-center'>
          <FaShoppingCart className='text-3xl h-7'/> <sub className='bg-emerald-500 p-3 h-3 w-3 flex mx-1 justify-center rounded-3xl  font-bold'>3</sub>
        </div>
      </header>

      {/* Navbar */}
      <nav className='mt-1 flex flex-col sm:flex-row justify-between items-center border rounded p-2 shadow-sm'>
        {/* Logo */}
        <Link to='/'><img src={Logo} alt="logo" className='w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-0' /></Link>

        {/* Search bar */}
        <div className='flex w-full sm:w-auto items-center space-x-2 mb-2 sm:mb-0'>
          <input
            type="text"
            placeholder='Search...'
            value={searchTerm}
            onChange={handleSearch}
            className='border-2 border-slate-400 w-full sm:w-80 p-1 rounded'
          />
          <Link to={`/search/${searchTerm}`} className='p-1 font-medium rounded bg-blue-900 text-white'>
            Search
          </Link>
        </div>

        {/* Navigation links */}
        <ul className='flex flex-wrap justify-center sm:justify-end space-x-3'>
          <Link to='/' className='m-2 font-medium text-sm sm:text-md'>Home</Link>
          <li className='m-2 font-medium text-sm sm:text-md'>Help Center</li>
          <li className='m-2 font-medium text-sm sm:text-md'>Become a Seller</li>
          <li className='m-2 font-medium text-sm sm:text-md'>Get the App</li>
        </ul>
        <Link to='/signup' className='text-center'>
          <FaUser className='ml-4' />
          Sign up
        </Link>

      </nav>
    </div>
  );
};

export default Navbar;
