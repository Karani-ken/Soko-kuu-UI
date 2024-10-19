import React, { useState } from 'react';
import Logo from '../../assets/soko-kuu.png';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaBars } from "react-icons/fa";
import Cart from '../Cart/Cart';
import Login from '../Authentication/Login';
import RegisterForm from '../Authentication/RegisterForm';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for the sidebar

  // Toggle cart visibility, if user is not logged in, prompt login
  const toggleCart = () => {
    if (isLoggedIn()) {
      setIsCartOpen(!isCartOpen);
    } else {
      toggleLogin(); // Open login modal if not logged in
    }
  };

  // Toggle login modal
  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  // Toggle register modal
  const toggleRegister = () => {
    setIsRegisterOpen(!isRegisterOpen);
  };

  // Toggle sidebar for small screens
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
      <nav className='mt-1 flex flex-row justify-between items-center border rounded p-2 shadow-sm'>
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

        {/* Hamburger icon for sidebar */}
        <button onClick={toggleSidebar} className='sm:hidden text-3xl p-2'>
          <FaBars />
        </button>

        {/* Sidebar for small devices */}
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-blue-900 md:text-black sm:text-black text-white z-50 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } sm:static sm:translate-x-0 sm:w-auto sm:bg-transparent sm:h-auto sm:p-0`}
        >
          <button onClick={toggleSidebar} className='block sm:hidden text-3xl p-2 absolute right-2 top-2'>
            ✕
          </button>
          <ul className='flex flex-col sm:flex-row justify-center sm:justify-end space-y-4 sm:space-y-0 sm:space-x-3 p-4 sm:p-0'>
            <li><Link to='/' className='m-2 font-medium text-sm sm:text-md'>Home</Link></li>
            <li className='m-2 font-medium text-sm sm:text-md'>Help Center</li>
            <li className='m-2 font-medium text-sm sm:text-md'>Become a Seller</li>
            <li className='m-2 font-medium text-sm sm:text-md'>Get the App</li>
          </ul>
        </div>



        {/* Conditional rendering based on login state */}
        {isLoggedIn() ? (
          <button onClick={handleSignOut} className='text-center'>
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
