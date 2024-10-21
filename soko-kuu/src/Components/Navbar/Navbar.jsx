import React, { useState } from 'react';
import Logo from '../../assets/soko-kuu.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaBars } from "react-icons/fa";
import Cart from '../Cart/Cart';
import { FcViewDetails } from "react-icons/fc";
import Login from '../Authentication/Login';
import RegisterForm from '../Authentication/RegisterForm';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for the sidebar
  const navigate = useNavigate()
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

  const handleNavigateToOrders = () => {
    navigate('/orders')
  }
  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/')
    window.location.reload();
  };

  return (
    <div>
      {/* Header */}
      <header className='bg-blue-900 text-white md:flex justify-between p-2 text-center rounded-sm'>
        <h1 className='font-medium text-sm text-center sm:text-base md:text-lg lg:text-xl'>
          Get Amazing deals at Soko-Kuu
        </h1>
        <div className='flex justify-between md:justify-end lg:justify-end bg-blue-400 md:bg-blue-900 lg:bg-blue-900 rounded'>
          {isLoggedIn() && (
            <>
              <button className='cursor-pointer mx-3 hover:bg-blue-400 p-1 rounded' onClick={toggleCart}>
                <FaShoppingCart className='text-2xl' /> Cart
              </button>
              <button className='cursor-pointer mx-3 p-1 hover:bg-blue-400 rounded' onClick={handleNavigateToOrders}>
                <FcViewDetails className='text-2xl' /> Orders
              </button>
              <button onClick={handleSignOut} className='text-center p-1'>
                <FaUser className='text-2xl' />
                Sign out
              </button>
            </>
          )}
          {!isLoggedIn() && (
            <button className='mx-3'>
              <Link to='/signin' className='text-center p-1'>
                <FaUser className='text-2xl' />
                Sign in
              </Link>
            </button>
          )}
        </div>
      </header>

      {/* Navbar */}
      <nav className='mt-1 flex flex-row justify-between items-center border rounded p-2 shadow-sm'>
        {/* Logo */}
        <Link to='/'><img src={Logo} alt="logo" className='w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-0 object-contain' /></Link>

        {/* Search bar */}
        <div className='flex w-full sm:w-auto items-center space-x-2 mb-2 mx-1 sm:mb-0'>
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
            {isLoggedIn() && (
              <li><Link to='/profile' className='m-2 font-medium text-sm sm:text-md'>Profile</Link></li>
            )}
          </ul>
        </div>
      </nav>

      {/* Cart, Login, and Register modals */}
      {isCartOpen && <Cart toggleCart={toggleCart} />}
      {isLoginOpen && <Login toggleLogin={toggleLogin} openRegister={openRegister} />} {/* Pass openRegister */}

    </div>
  );
};

export default Navbar;
