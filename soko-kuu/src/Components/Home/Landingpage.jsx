import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Image from '../../assets/watch.jpg'; // Placeholder image if no product image is fetched
import Logo from '../../assets/soko-kuu.png';
import { LuBadgeCheck } from "react-icons/lu";

const Landingpage = () => {
  const navigate = useNavigate()
  const [exclusiveProducts, setExclusiveProducts] = useState([]);
  const [topSellers, setTopSellers] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0); // State for current category index
  const [currentSellerIndex, setCurrentSellerIndex] = useState(0); // State for current seller index

  // Fetch exclusive products
  useEffect(() => {
    const fetchExclusiveProducts = async () => {
      try {
        const response = await axios.get('https://api.kelynemedia.co.ke/products/products/84');
        setExclusiveProducts(response.data);
      } catch (error) {
        console.error('Error fetching exclusive products:', error);
      }
    };

    fetchExclusiveProducts();
  }, []);

  // Fetch top sellers
  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await axios.get('https://api.kelynemedia.co.ke/auth/gold-users');
        setTopSellers(response.data);
      } catch (error) {
        console.error('Error fetching top sellers:', error);
      }
    };

    fetchTopSellers();
  }, []);

  // Fetch top categories
  useEffect(() => {
    const fetchTopCategories = async () => {
      try {
        const response = await axios.get('https://api.kelynemedia.co.ke/categories/get-productcategories');
        setTopCategories(response.data);
      } catch (error) {
        console.error('Error fetching top categories:', error);
      }
    };

    fetchTopCategories();
  }, []);

  // Change exclusive product every 10 seconds
  useEffect(() => {
    if (exclusiveProducts.length > 0) {
      const interval = setInterval(() => {
        setCurrentProductIndex((prevIndex) => (prevIndex + 1) % exclusiveProducts.length);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [exclusiveProducts]);

  // Change top category every 10 seconds
  useEffect(() => {
    if (topCategories.length > 0) {
      const interval = setInterval(() => {
        setCurrentCategoryIndex((prevIndex) => (prevIndex + 1) % topCategories.length);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [topCategories]);

  // Change top seller every 10 seconds
  useEffect(() => {
    if (topSellers.length > 0) {
      const interval = setInterval(() => {
        setCurrentSellerIndex((prevIndex) => (prevIndex + 1) % topSellers.length);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [topSellers]);

  // Parse JSON string to get images
  const getProductImage = (product) => {
    try {
      const images = JSON.parse(product.product_images);
      return images.length > 0 ? images[0] : Image;
    } catch (error) {
      console.error('Error parsing product images:', error);
      return Image;
    }
  };

  const currentProduct = exclusiveProducts[currentProductIndex];
  const currentCategory = topCategories[currentCategoryIndex];
  const currentSeller = topSellers[currentSellerIndex];

  const handleNavigate = (id) => {
    navigate(`/products/${id}`)
  }

  const navigateToCategory = (name,banner) => {
    navigate(`/category/${name}`, { state: { banner: banner || Logo } }); // Passing the banner as state
  };

  const navigateToStore = (id) => {
    navigate(`/store/${id}`)
  }

  return (
    <div className="bg-blue-500 my-2 rounded-md flex flex-col md:flex-row lg:flex-row w-full h-[70vh] md:h-[60vh] lg:h-96 p-4 lg:p-0">

      {/* Top Categories Section */}
      <div className="lg:w-1/4 w-full hidden lg:block text-center mb-6 lg:mb-0">
        <h1 className="text-white font-semibold text-lg lg:text-xl mt-4 lg:mt-6">Top Categories</h1>
        <div className="flex justify-center">
          {currentCategory ? (
            <div
              className="bg-white m-3 rounded-lg p-2 w-48 flex flex-col justify-between"
              style={{
                backgroundImage: `url(${currentCategory.banner || Logo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '200px',
                color: 'white' // To ensure text is visible on a background image
              }}
            >
              <div className="flex justify-center items-center h-full">
                {/* Empty div for spacing, text goes on top of the background */}
              </div>
              <div className="bg-black bg-opacity-50 p-2 rounded-lg">
                <h1 className="font-medium my-2 text-sm lg:text-base">{currentCategory.category_name}</h1>
                <button className="text-white bg-blue-400 p-1 rounded-lg text-sm lg:text-base" onClick={() => navigateToCategory(currentCategory.category_name,currentCategory.banner)}>View Products</button>
              </div>
            </div>

          ) : (
            <h1 className="font-bold text-white">Loading...</h1>
          )}
        </div>
      </div>

      {/* Middle Section: Product Highlight */}
      <div className="lg:w-2/4 w-full min-h-72">        
        <div className=" md:flex lg:flex justify-center">
          <div className="text-center lg:text-left flex flex-col md:flex-row lg:flex-row justify-between bg-white  rounded-lg shadow-md w-full">
            <div className="lg:w-1/2 w-full md:w-1/2 p-2">
              <LuBadgeCheck className="text-yellow-500 text-3xl" />
              {currentProduct ? (
                <>
                  <h1 className="font-bold my-3 lg:my-5 text-lg lg:text-xl">{currentProduct.product_name}</h1>
                  <p className="font-medium text-slate-600 text-sm lg:text-base">{currentProduct.product_description}</p>
                  <h1 className="my-3 lg:my-5 bg-black p-1 text-white font-bold mx-auto lg:mx-14 text-lg lg:text-xl w-28 lg:w-32 text-center rounded">
                    <sup>Kes</sup> {currentProduct.product_price} 
                  </h1>
                  <button className="bg-blue-400 p-1 mt-3 lg:mt-5 rounded text-white font-medium" onClick={() => handleNavigate(currentProduct.product_id)}>See more</button>
                </>
              ) : (
                <h1 className="font-bold my-3 lg:my-5 text-lg lg:text-xl">Loading...</h1>
              )}
            </div>
            <div className="lg:w-1/2 md:w-1/2 flex justify-center mt-2 md:mt-0 lg:mt-0">
              {currentProduct && (
                <img
                  src={getProductImage(currentProduct)}
                  alt={currentProduct.product_name}
                  className="w-full lg:w-72 h-48 md:h-72 lg:h-72 object-contain rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Top Sellers Section */}
      <div className="lg:w-1/4 w-full hidden lg:block text-center mt-6 lg:mt-0">
        <h1 className="text-white font-semibold text-lg lg:text-xl mt-4 lg:mt-6">Top Sellers</h1>
        <div className="flex justify-center">
          {currentSeller ? (
            <div
              className="bg-white m-3 rounded-lg p-2 w-48 flex flex-col justify-between"
              style={{
                backgroundImage: `url(${currentSeller.profile_pic || Logo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '200px',
                color: 'white' // To ensure the text is visible on the background
              }}
            >
              <div className="flex justify-center items-center h-full">
                {/* Empty div for spacing, text goes on top of the background */}
              </div>
              <div className="bg-black bg-opacity-50 p-2 rounded-lg">
                <h1 className="font-medium my-2 text-sm lg:text-base">{currentSeller.name}</h1>
                <button className="text-white bg-blue-400 p-1 rounded-lg text-sm lg:text-base" onClick={() => navigateToStore(currentSeller.id)}>Visit Store</button>
              </div>
            </div>

          ) : (
            <h1 className="font-bold text-white">Loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
