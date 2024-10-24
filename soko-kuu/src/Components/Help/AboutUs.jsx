import React from 'react';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className='container mx-auto my-8 p-6 min-h-screen bg-white shadow-lg rounded-lg'>
      <h1 className='text-4xl font-bold text-center mb-6 text-blue-900'>About Us</h1>
      
      <p className='text-gray-700 mb-4 text-lg'>
        Welcome to Soko-Kuu, your one-stop e-commerce online mall where we bring quality and affordability together! 
        Our platform is designed to cater to all your shopping needs, ensuring a seamless and enjoyable experience.
      </p>
      
      <h2 className='text-2xl font-semibold text-blue-700 mt-6'>Our Mission</h2>
      <p className='text-gray-700 mb-4'>
        Our mission is to revolutionize the way you shop by providing a diverse selection of products at competitive prices. 
        We aim to empower customers by making shopping convenient, accessible, and enjoyable for everyone.
      </p>

      <h2 className='text-2xl font-semibold text-blue-700 mt-6'>Our Vision</h2>
      <p className='text-gray-700 mb-4'>
        At Soko-Kuu, we envision a future where everyone has access to quality products without compromising on price. 
        We strive to be the leading online mall in the region, continually expanding our offerings and improving our services.
      </p>

      <h2 className='text-2xl font-semibold text-blue-700 mt-6'>Our Values</h2>
      <ul className='list-disc list-inside text-gray-700 mb-4'>
        <li>Integrity: We believe in being honest and transparent in all our dealings.</li>
        <li>Customer Satisfaction: Our customers are at the heart of everything we do.</li>
        <li>Quality: We are committed to offering only the best products.</li>
        <li>Innovation: We continuously seek new ways to enhance your shopping experience.</li>
      </ul>

      <h2 className='text-2xl font-semibold text-blue-700 mt-6'>Meet the Team</h2>
      <p className='text-gray-700 mb-4'>
        Our dedicated team consists of experienced professionals who are passionate about e-commerce and customer service. 
        We work tirelessly to ensure that your shopping experience is smooth and satisfying. From product selection to delivery, 
        we are here to assist you every step of the way.
      </p>

      <h2 className='text-2xl font-semibold text-blue-700 mt-6'>Get in Touch</h2>
      <p className='text-gray-700 mb-4'>
        We value your feedback! If you have any questions, suggestions, or need assistance, feel free to reach out to us 
        through our contact page or follow us on our social media channels.
      </p>

      <div className='flex justify-center space-x-4 mt-4'>
        <a href="https://www.facebook.com/profile.php?id=100094631103100" target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:text-blue-900 transition duration-300'>
          <FaFacebookF size={30} />
        </a>
        <a href="https://www.instagram.com/soko_kuu254/profilecard/?igsh=MTZ4MXlhZWQyOTB2ZA==" target="_blank" rel="noopener noreferrer" className='text-pink-600 hover:text-pink-900 transition duration-300'>
          <FaInstagram size={30} />
        </a>
        <a href="https://www.tiktok.com/@soko_kuu254?_t=8qoXoH5encT&_r=1" target="_blank" rel="noopener noreferrer" className='text-black hover:text-gray-700 transition duration-300'>
          <FaTiktok size={30} />
        </a>
        <a href="https://whatsapp.com/channel/0029VahplvpCBtxGM4fOHe2z" target="_blank" rel="noopener noreferrer" className='text-green-600 hover:text-green-800 transition duration-300'>
          <FaWhatsapp size={30} />
        </a>
      </div>

      <p className='text-gray-700 text-center mt-4'>
        Thank you for choosing Soko-Kuu. Happy shopping!
      </p>
    </div>
  );
};

export default AboutUs;
