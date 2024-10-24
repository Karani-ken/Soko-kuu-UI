import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaHourglassStart, FaCheckCircle, FaTruck, FaBoxOpen } from 'react-icons/fa'; // Import icons from react-icons

const OrderTracking = () => {
  const location = useLocation();
  const { order_status } = location.state || {};

  const statuses = [
    { name: 'Placed', icon: <FaHourglassStart />, color: 'bg-blue-500' },
    { name: 'Confirmed', icon: <FaCheckCircle />, color: 'bg-blue-500' },
    { name: 'Pending Delivery', icon: <FaTruck />, color: 'bg-blue-500' },
    { name: 'Delivered', icon: <FaBoxOpen />, color: 'bg-blue-500' },
  ];

  const statusIndex = statuses.findIndex(status => status.name === order_status);

  const [currentStatus, setCurrentStatus] = useState(statusIndex !== -1 ? statusIndex : 0);

  useEffect(() => {
    if (statusIndex !== -1) {
      setCurrentStatus(statusIndex);
    }
  }, [statusIndex]);

  return (
    <div className="container min-h-screen mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">Order Status Tracking</h1>
      <div className="flex justify-center items-center mb-8">
        <div className="w-full lg:w-2/3">
          <div className="flex justify-between items-center relative">
            {/* Progress Bar Background */}
            <div className="absolute w-full h-1 bg-gray-300 top-1/2 transform -translate-y-1/2 z-0"></div>

            {statuses.map((status, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center w-1/6">
                {/* Indicator for completed status */}
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white text-2xl ${index <= currentStatus ? status.color : 'bg-gray-300'}`}
                >
                  {status.icon}
                </div>
                {/* Status Label */}
                <p
                  className={`mt-2 text-center text-xs font-semibold ${index <= currentStatus ? 'text-black' : 'text-gray-400'}`}
                >
                  {status.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center">
        {/* Display Current Status */}
        <p className="text-lg font-semibold text-blue-900">Current Status: {statuses[currentStatus].name}</p>
      </div>
    </div>
  );
};

export default OrderTracking;
