import React from 'react';
import { FaApple, FaAmazon, FaAndroid, FaGooglePlay } from 'react-icons/fa';

const GetApp = () => {
  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center bg-blue-200 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Get Our App</h1>
      <p className="mb-4 text-lg text-gray-700 text-center">
        Download our app to enjoy the best experience on your mobile device.
      </p>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
       {
        /**
         *  <a
          href="https://apps.apple.com/app/soko-kuu/id123456789" // Replace with your App Store link
          className="flex items-center justify-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaApple className="text-red-600 text-3xl mr-2" />
          <span className="text-lg text-gray-700">Download on the App Store</span>
        </a>

       
        <a
          href="https://play.google.com/store/apps/details?id=com.soko.kuu" // Replace with your Google Play Store link
          className="flex items-center justify-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGooglePlay className="text-green-500 text-3xl mr-2" />
          <span className="text-lg text-gray-700">Get it on Google Play</span>
        </a>
         * 
         */
       }
       

        {/* Amazon Appstore Link */}
        <a
          href=" https://www.amazon.com/dp/B0DJSS1DDP/ref=apps_sf_sta" // Replace with your Amazon Appstore link
          className="flex items-center justify-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaAmazon className="text-orange-500 text-3xl mr-2" />
          <span className="text-lg text-gray-700">Get it on Amazon Appstore</span>
        </a>

        {/* APK Download Link */}
        <a
          href="/path/to/your/app.apk" // Replace with the path to your APK file
          className="flex items-center justify-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
          download // This attribute suggests downloading the file
        >
          <FaAndroid className="text-green-600 text-3xl mr-2" />
          <span className="text-lg text-gray-700">Download APK</span>
        </a>
      </div>
    </div>
  );
};

export default GetApp;
