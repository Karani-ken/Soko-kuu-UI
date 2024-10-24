import React from 'react';
import { FaShieldAlt, FaRegUser, FaRegEnvelope, FaLock } from 'react-icons/fa';

const PrivacyPolicy = () => {
  return (
    <div className='container mx-auto my-8 p-6 min-h-screen bg-white shadow-lg rounded-lg'>
      <h1 className='text-4xl font-bold text-center mb-6 text-blue-900'>Privacy Policy</h1>
      <p className='text-gray-700 mb-4'>
        At Soko-Kuu, we value your privacy and are committed to protecting your personal information. 
        This policy outlines how we collect, use, and safeguard your data.
      </p>

      <h2 className='text-2xl font-semibold text-blue-700 mt-6 flex items-center'>
        <FaShieldAlt className='mr-2 text-blue-500' /> Information Collection
      </h2>
      <p className='text-gray-700 mb-4'>
        We collect information from you when you register on our site, place an order, or interact with us. 
        This may include your name, email address, mailing address, phone number, and payment information.
      </p>

      <h2 className='text-2xl font-semibold text-blue-700 mt-6 flex items-center'>
        <FaRegUser className='mr-2 text-blue-500' /> Information Use
      </h2>
      <p className='text-gray-700 mb-4'>
        We use the information we collect to process your transactions, improve our website, and communicate with you 
        about your orders and our products.
      </p>

      <h2 className='text-2xl font-semibold text-blue-700 mt-6 flex items-center'>
        <FaLock className='mr-2 text-blue-500' /> Data Protection
      </h2>
      <p className='text-gray-700 mb-4'>
        We implement a variety of security measures to maintain the safety of your personal information. 
        This includes encryption, firewalls, and secure server facilities.
      </p>

      <h2 className='text-2xl font-semibold text-blue-700 mt-6 flex items-center'>
        <FaRegEnvelope className='mr-2 text-blue-500' /> Communication Preferences
      </h2>
      <p className='text-gray-700 mb-4'>
        You may receive periodic emails from us regarding your order or other products and services. 
        If you wish to unsubscribe, you can do so at any time by following the instructions in the email.
      </p>

      <h2 className='text-2xl font-semibold text-blue-700 mt-6 flex items-center'>
        <FaShieldAlt className='mr-2 text-blue-500' /> Sharing Your Information
      </h2>
      <p className='text-gray-700 mb-4'>
        We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent, 
        except to provide services you have requested.
      </p>

      <h2 className='text-2xl font-semibold text-blue-700 mt-6 flex items-center'>
        <FaLock className='mr-2 text-blue-500' /> Your Rights
      </h2>
      <p className='text-gray-700 mb-4'>
        You have the right to access the personal information we hold about you and to request correction of any inaccuracies. 
        You can also request the deletion of your personal data under certain conditions.
      </p>

      <h2 className='text-2xl font-semibold text-blue-700 mt-6 flex items-center'>
        <FaShieldAlt className='mr-2 text-blue-500' /> Changes to This Policy
      </h2>
      <p className='text-gray-700 mb-4'>
        We may update this privacy policy periodically to reflect changes in our practices or for other operational, 
        legal, or regulatory reasons. We will notify you of any significant changes through our website.
      </p>

      <h2 className='text-2xl font-semibold text-blue-700 mt-6 flex items-center'>
        <FaLock className='mr-2 text-blue-500' /> Contact Us
      </h2>
      <p className='text-gray-700 mb-4'>
        If you have any questions about this Privacy Policy or our data practices, please contact us at 
        <a href='mailto:support@soko-kuu.com' className='text-blue-600 underline'> support@soko-kuu.co.ke</a>.
      </p>
      
      <p className='text-gray-700 text-center mt-4'>
        Thank you for trusting Soko-Kuu with your information. We are committed to safeguarding your privacy.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
