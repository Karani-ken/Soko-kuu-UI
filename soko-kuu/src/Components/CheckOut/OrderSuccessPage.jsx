import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa'; // Importing an icon from React Icons

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  const handleNavigate = async => {
    navigate('/')
  }
  return (
    <div className="flex items-center justify-center lg:min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <FaCheckCircle className="text-green-500 text-5xl" />
        </div>
        <h1 className="text-2xl font-bold text-center text-teal-600 mb-2">Order Placed Successfully!</h1>
        <p className="text-center text-gray-700 mb-4">
          Thank you for your order! We have received your order and are processing it.
        </p>
       
        <div className="mt-6">
          <button onClick={handleNavigate} className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessPage;
