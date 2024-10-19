import React from 'react';
import Logo from '../../assets/soko-kuu.png';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ name, banner }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/category/${name}`, { state: { banner: banner || Logo } }); // Passing the banner as state
  };

  return (
    <div className='min-w-40 h-40 mx-5'>
      <div
        onClick={handleNavigate}
        className="min-w-40 h-40  cursor-pointer relative rounded-lg overflow-hidden p-2 bg-gray-50"
        style={{
          backgroundImage: `url(${banner || Logo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >       
      </div>
      <h1 className='text-center mt-1 text-black font-semibold'>{name}</h1>
    </div>

  );
};

export default CategoryCard;
