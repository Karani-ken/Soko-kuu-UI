import React, { useState } from 'react';
import Logo from '../../assets/soko-kuu.png';
import {  useNavigate } from 'react-router-dom';
const CategoryCard = ({ name, banner }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/category')
  }
  return (
    <div
    onClick={handleNavigate}
      className="min-w-52 h-56 mx-5 cursor-pointer relative rounded-lg overflow-hidden p-2 bg-gray-50"
      style={{
        backgroundImage: `url(${banner || Logo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20 ">         
          <h1 className='text-center mt-32 text-white bg-blue-400 font-semibold'>Electronics</h1>
        
      <button className='text-white bg-blue-400 mx-10 mt-5 rounded-lg bg-opacity-80 p-2'>View Products</button>
      </div>
    </div>
  );
};

export default CategoryCard;
