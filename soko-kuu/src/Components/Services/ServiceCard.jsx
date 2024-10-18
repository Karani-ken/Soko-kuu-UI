import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/soko-kuu.png';

const ServiceCard = ({ service, loading }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/servicepage/${service.service_id}`); // Navigate to the service page
  };
console.log(service)
  // Parse the JSON string of images
  let serviceImages = [];
  try {
    serviceImages = JSON.parse(service.service_images); // Assuming service.images is a JSON string
  } catch (error) {
    console.error('Error parsing service images:', error);
  }

  // Get the first image or use the default logo
  const imageToDisplay = serviceImages.length > 0 ? serviceImages[0] : Logo;

  return (
    <div className='min-w-52 p-2 mx-5 border rounded shadow bg-white text-center' onClick={handleNavigate}>
      {loading ? (
        // Placeholder for loading state
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-md"></div>
          <h1 className='text-gray-400 font-bold text-xl my-1'>Loading...</h1>
          <p className='text-medium bg-gray-200 rounded h-4 w-3/4 mx-auto'></p>
        </div>
      ) : (
        <>
          <img src={imageToDisplay} alt={service.service_name} className='max-h-40 h-32 w-full' />
          <h1 className='font-bold text-xl my-1'>{service.service_name}</h1>
          <p className='text-medium whitespace-nowrap overflow-hidden text-ellipsis'>{service.service_description}</p>
          <button className='text-medium bg-blue-900 text-white p-1 rounded-xl' onClick={handleNavigate}>View Service</button>
        </>
      )}
    </div>
  );
};

export default ServiceCard;
