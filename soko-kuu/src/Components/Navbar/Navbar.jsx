import React, { useState, useEffect, useRef } from 'react';
import Logo from '../../assets/soko-kuu.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaBars } from "react-icons/fa";
import Cart from '../Cart/Cart';
import { FcViewDetails } from "react-icons/fc";
import Login from '../Authentication/Login';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fastFoodProducts, setFastFoodProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleCart = () => {
    if (isLoggedIn()) {
      setIsCartOpen(!isCartOpen);
    } else {
      toggleLogin();
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://api.kelynemedia.co.ke/categories/get-productcategories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchFastFoodProducts = async () => {
    try {
      const response = await fetch('https://api.kelynemedia.co.ke/products/category/Fast Food');
      const data = await response.json();
      setFastFoodProducts(data);
    } catch (error) {
      console.error('Error fetching Fast Food products:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchFastFoodProducts();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentProductIndex((prevIndex) => 
        (prevIndex + 1) % fastFoodProducts.length
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [fastFoodProducts]);

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };

  const isLoggedIn = () => {
    return !!localStorage.getItem('token');
  };

  const handleNavigateToOrders = () => {
    navigate('/orders');
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    navigate('/');
    window.location.reload();
  };

  const currentProduct = fastFoodProducts[currentProductIndex];

  return (
    <div>
      {/* Header */}
      <header className='bg-blue-900 text-white md:flex justify-between p-2 text-center rounded-sm'>
        {currentProduct ? (
          <div className='flex flex-col bg-red-700 min-w-52 rounded-md p-1 items-center text-center'>
            <h1 className='font-bold text-lg'>{currentProduct.product_name}</h1>
            <p className='text-sm mb-2'><sup>Kes</sup> {currentProduct.product_price}</p>
            <button 
              onClick={() => navigate(`/products/${currentProduct.product_id}`)}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded'
            >
              Order Now
            </button>
          </div>
        ) : (
          <h1 className='font-medium text-lg'>Loading...</h1>
        )}
        
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
        <Link to='/'><img src={Logo} alt="logo" className='w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-0 object-contain' /></Link>

        {/* Search bar */}
        <form onSubmit={handleSearchSubmit} className='flex w-full sm:w-auto items-center space-x-2 mb-2 mx-1 sm:mb-0'>
          <input
            type="text"
            placeholder='Search...'
            value={searchTerm}
            onChange={handleSearch}
            className='border-2 border-slate-400 w-full sm:w-80 p-1 rounded'
          />
          <button type='submit' className='p-1 font-medium rounded bg-blue-900 text-white'>
            Search
          </button>
        </form>

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
            <li ref={dropdownRef} className='relative m-2 font-medium text-sm sm:text-md'>
              <button onClick={toggleDropdown} className='focus:outline-none'>
                Category
              </button>
              {isDropdownOpen && (
                <div className='absolute z-10 bg-white text-white w-72 lg:w-96 border rounded-md shadow-lg mt-2'>
                  <ul className='grid grid-cols-2 lg:grid-cols-3 overflow-y-auto'>
                    {categories.map(category => (
                      <li key={category.category_id} className='p-2 '>
                        <Link to={`/category/${category.category_name}`} className='block text-black text-sm'>{category.category_name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
            <li><Link to='/help' className='m-2 font-medium text-sm sm:text-md'>Help Center</Link></li>
            <li><Link to='/get-app' className='m-2 font-medium text-sm sm:text-md'>Get the App</Link></li>
            {isLoggedIn() && (
              <li><Link to='/profile' className='m-2 font-medium text-sm sm:text-md'>Profile</Link></li>
            )}
          </ul>
        </div>
      </nav>

      {/* Cart, Login, and Register modals */}
      {isCartOpen && <Cart toggleCart={toggleCart} />}
      {isLoginOpen && <Login toggleLogin={toggleLogin} openRegister={openRegister} />}
    </div>
  );
};

export default Navbar;
