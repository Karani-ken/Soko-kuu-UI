import React, { useState } from 'react';

const OrderTracking = () => {
  const statuses = [
    { name: 'Pending', color: 'bg-green-500' },
    { name: 'Confirmed', color: 'bg-green-500' },
    { name: 'Pending Delivery', color: 'bg-green-500' },
    { name: 'Delivered', color: 'bg-green-500' },
    { name: 'Cancelled', color: 'bg-green-500' },
    { name: 'Collected', color: 'bg-green-500' },
  ];

  // Let's simulate the current status by setting it dynamically
  const [currentStatus, setCurrentStatus] = useState(2); // 0 = Pending, 1 = Confirmed, 2 = Pending Delivery, etc.

  return (-
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
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${index <= currentStatus ? status.color : 'bg-gray-300'
                    }`}
                >
                  {index + 1}
                </div>
                {/* Status Label */}
                <p
                  className={`mt-2 text-center text-xs font-semibold ${index <= currentStatus ? 'text-black' : 'text-gray-400'
                    }`}
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

        {/* Control buttons to simulate changing status */}
        <div className="flex justify-center mt-6 space-x-2">
          <button
            className="bg-blue-900 text-white py-2 px-4 rounded"
            onClick={() => setCurrentStatus((prev) => Math.max(prev - 1, 0))}
            disabled={currentStatus === 0}
          >
            Previous
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={() => setCurrentStatus((prev) => Math.min(prev + 1, statuses.length - 1))}
            disabled={currentStatus === statuses.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
