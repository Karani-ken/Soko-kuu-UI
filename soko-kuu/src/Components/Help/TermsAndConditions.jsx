import React from 'react';
import { FaGavel, FaInfoCircle, FaShoppingCart, FaExclamationTriangle } from 'react-icons/fa';

const TermsAndConditions = () => {
  return (
    <div className='container mx-auto my-8 p-6 min-h-screen bg-white shadow-lg rounded-lg'>
      <h1 className='text-4xl font-bold text-center mb-6 text-blue-900'>Terms and Conditions</h1>
      <p className='text-gray-700 mb-4'>
        Welcome to Soko-Kuu! By accessing our website, you agree to comply with and be bound by the following terms and conditions.
      </p>

      <h2 className='text-2xl font-semibold text-blue-700 mt-6 flex items-center'>
        <FaGavel className='mr-2 text-blue-500' /> Use of the Website
      </h2>
      <p className='text-gray-700 mb-4'>
        You agree to use the website for lawful purposes only and in a manner that does not infringe the rights of, or restrict the use and enjoyment of this website by, any third party.
      </p>

      <h2 className='text-2xl font-semibold text-blue-700 mt-6 flex items-center'>
        <FaShoppingCart className='mr-2 text-blue-500' /> Product Information
      </h2>
      <p className='text-gray-700 mb-4'>
        We take all reasonable care to ensure that the details, descriptions, and prices of the products appearing on the site are correct. However, we do not warrant that such information is error-free or complete.
      </p>

      <h2 className='text-2xl font-semibold text-blue-700 mt-6 flex items-center'>
        <FaInfoCircle className='mr-2 text-blue-500' /> Order Acceptance and Cancellation
      </h2>
      <p className='text-gray-700 mb-4'>
        All orders are subject to acceptance by Soko-Kuu. We may refuse to accept or cancel an order for various reasons, including unavailability of products or inaccuracies in product information.
      </p>

      <h2 className='text-2xl font-semibold text-blue-700 mt-6 flex items-center'>
        <FaExclamationTriangle className='mr-2 text-blue-500' /> Limitation of Liability
      </h2>
      <p className='text-gray-700 mb-4'>
        Soko-Kuu shall not be liable for any indirect, incidental, or consequential damages arising out of the use of or inability to use the website or the products purchased from it.
      </p>

      <h2 className='text-2xl font-semibold text-blue-700 mt-6 flex items-center'>
        <FaInfoCircle className='mr-2 text-blue-500' /> Intellectual Property Rights
      </h2>
      <p className='text-gray-700 mb-4'>
        All content, trademarks, and other intellectual property on the website are the property of Soko-Kuu or its licensors. Unauthorized use of any material may violate copyright, trademark, and other laws.
      </p>

      <h2 className='text-2xl font-semibold text-blue-700 mt-6 flex items-center'>
        <FaExclamationTriangle className='mr-2 text-blue-500' /> Governing Law
      </h2>
      <p className='text-gray-700 mb-4'>
        These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Soko-Kuu operates. Any disputes will be resolved in the appropriate courts of that jurisdiction.
      </p>

      <h2 className='text-2xl font-semibold text-blue-700 mt-6 flex items-center'>
        <FaGavel className='mr-2 text-blue-500' /> Changes to the Terms
      </h2>
      <p className='text-gray-700 mb-4'>
        We reserve the right to modify these terms and conditions at any time. Any changes will be effective immediately upon posting on the website. Your continued use of the website after such changes constitutes your acceptance of the new terms.
      </p>

      <p className='text-gray-700 text-center mt-6'>
        Thank you for choosing Soko-Kuu. We appreciate your business and hope you enjoy your shopping experience!
      </p>
    </div>
  );
};

export default TermsAndConditions;
