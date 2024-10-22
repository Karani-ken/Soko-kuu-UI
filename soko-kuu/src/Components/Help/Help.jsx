import React from 'react';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Help = () => {
  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center bg-gray-100 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Help Us</h1>
      <p className="mb-4 text-lg text-gray-700 text-center">
        If you have any questions or need assistance, feel free to reach out to us!
      </p>
      
      <div className="bg-white shadow-md rounded-lg p-6 w-11/12 md:w-1/2">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Support</h2>
        <div className="flex items-center mb-4">
          <FaWhatsapp className="text-green-500 text-2xl mr-2" />
          <a 
            href="https://wa.me/254713801284" // Replace with your WhatsApp number
            className="text-lg text-gray-700 hover:text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp: +254713801284
          </a>
        </div>
        <div className="flex items-center">
          <FaEnvelope className="text-blue-500 text-2xl mr-2" />
          <a 
            href="mailto:info@soko-kuu.com" // Replace with your email address
            className="text-lg text-gray-700 hover:text-blue-600"
          >
            Email: support@soko-kuu.co.ke
          </a>
        </div>
      </div>
    </div>
  );
};

export default Help;
