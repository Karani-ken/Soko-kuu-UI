import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Importing icons from react-icons

const AgeConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white text-black md:p-8 shadow-lg rounded-lg w-full lg:w-1/2">
        <p className="mt-2 text-xl font-bold text-center">
          <FaCheckCircle className="inline mr-2 text-green-600" />
          Hello there, please confirm that you are over 18 to proceed.
        </p>
        
        <div className="mt-6 flex justify-center space-x-4">
          <button
            className="bg-blue-900 text-white flex items-center p-2 md:px-6 py-3 rounded-lg transition duration-200 hover:bg-blue-800"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            <FaCheckCircle className="mr-2" />
            Yes, I'm 18!
          </button>
          <button
            className="bg-gray-600 text-white flex items-center p-2 md:px-6 py-3 rounded-lg transition duration-200 hover:bg-gray-500"
            onClick={onClose}
          >
            <FaTimesCircle className="mr-2" />
            No, I'm not
          </button>
        </div>

        <p className="mt-6 font-medium text-red-600 text-center">
          By agreeing to view this link, you certify that you are 18 years and above. 
          <br />
          Excess consumption of alcohol is injurious to health.
        </p>
      </div>
    </div>
  );
};

export default AgeConfirmationModal;
