import React from 'react';
import Image from '../../assets/watch.jpg';
import Logo from '../../assets/soko-kuu.png';

const Landingpage = () => {
  return (
    <div className="bg-blue-400 my-4 rounded-md flex flex-col lg:flex-row w-full h-[60vh] lg:h-80 p-4 lg:p-0">
      
      {/* Top Categories Section */}
      <div className="lg:w-1/4 w-full hidden md:block  text-center mb-6 lg:mb-0">
        <h1 className="text-white font-semibold text-lg lg:text-xl mt-4 lg:mt-6">Top Categories</h1>
        <div className="flex justify-center">
          <div className="bg-white m-3 rounded-lg p-2 w-48">
            <div className="flex justify-center">
              <img src={Logo} alt="Logo" className="w-20 lg:w-32" />
            </div>
            <h1 className="font-medium my-2 text-sm lg:text-base">Electronics</h1>
            <button className="text-white bg-blue-400 p-1 rounded-lg text-sm lg:text-base">View Products</button>
          </div>
        </div>
      </div>

      {/* Middle Section: Product Highlight */}
      <div className="lg:w-2/4 w-full  h-72 flex justify-center md:block ">
      
        <div className="text-center lg:text-left flex flex-col lg:flex-row justify-between bg-white m-4 rounded-lg shadow-md  w-full">
          <div className="lg:w-1/2 p-4">
            <h1 className="font-bold my-3 lg:my-5 text-lg lg:text-xl">Exclusive Watch</h1>
            <p className="font-light text-sm lg:text-base">Get the best Wrist watches from our store</p>
            <h1 className="my-3 lg:my-5 bg-black p-1 text-white font-bold mx-auto lg:mx-14 text-lg lg:text-xl w-28 lg:w-32 text-center rounded">Kes 599 /=</h1>
            <button className="bg-blue-400 p-1 mt-3 lg:mt-5 rounded text-white font-medium">Shop now</button>
          </div>
          <div className="lg:w-1/2 flex justify-center mt-2 lg:mt-0">
            <img src={Image} alt="Watch" className="w-full  lg:w-72 h-48 lg:h-64 object-fill  rounded-lg" />
          </div>
        </div>
        {/* Dots for the slider (for future use) */}
        <div className="hidden md:flex justify-center mt-4 lg:mt-0">
          <div className="bg-blue-900 h-2 w-2 mx-2 rounded-full"></div>
          <div className="bg-blue-900 h-2 w-2 mx-2 rounded-full"></div>
          <div className="bg-blue-900 h-2 w-2 mx-2 rounded-full"></div>
        </div>
      </div>

      {/* Top Sellers Section */}
      <div className="lg:w-1/4 w-full hidden md:block text-center mt-6 lg:mt-0">
        <h1 className="text-white font-semibold text-lg lg:text-xl mt-4 lg:mt-6">Top Sellers</h1>
        <div className="flex justify-center">
          <div className="bg-white m-3 rounded-lg p-2 w-48">
            <div className="flex justify-center">
              <img src={Logo} alt="Logo" className="w-20 lg:w-32" />
            </div>
            <h1 className="font-medium my-2 text-sm lg:text-base">Business ABC</h1>
            <button className="text-white bg-blue-400 p-1 rounded-lg text-sm lg:text-base">Visit Store</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
