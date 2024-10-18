import React, { useState } from 'react';
import Logo from '../../assets/soko-kuu.png';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart } from "react-icons/fa";
import Cart from '../Cart/Cart';
import Login from '../Authentication/Login';
import RegisterForm from '../Authentication/RegisterForm';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false); // State for register modal

  // Toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Toggle login modal
  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  // Toggle register modal
  const toggleRegister = () => {
    setIsRegisterOpen(!isRegisterOpen);
  };

  // Handle switching from login to register
  const openRegister = () => {
    toggleLogin(); // Close login
    toggleRegister(); // Open register
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const isLoggedIn = () => {
    return !!localStorage.getItem('token');
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div>
      {/* Header */}
      <header className='bg-blue-900 text-white md:flex justify-evenly p-2 text-center rounded-sm'>
        <h1 className='font-medium text-sm sm:text-base md:text-lg lg:text-xl'>
          Offer! Offer! Offer! Get Amazing deals at Soko-Kuu
        </h1>
        <div className='flex justify-center cursor-pointer hover:bg-blue-400 p-1 rounded' onClick={toggleCart}>
          <FaShoppingCart className='text-3xl h-7' />
        </div>
      </header>

      {/* Navbar */}
      <nav className='mt-1 flex flex-col sm:flex-row justify-between items-center border rounded p-2 shadow-sm'>
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

        {/* Conditional rendering based on login state */}
        {isLoggedIn() ? (
          <button to='/' onClick={handleSignOut} className='text-center'>
            <FaUser className='ml-4' />
            Sign out
          </button>
        ) : (
          <button className='text-center' onClick={toggleLogin}>
            <FaUser className='ml-4' />
            Sign in
          </button>
        )}
      </nav>

      {/* Cart, Login, and Register modals */}
      {isCartOpen && <Cart toggleCart={toggleCart} />}
      {isLoginOpen && <Login toggleLogin={toggleLogin} openRegister={openRegister} />} {/* Pass openRegister */}
      {isRegisterOpen && <RegisterForm toggleRegister={toggleRegister} />} {/* Register modal */}
    </div>
  );
};

export default Navbar;
