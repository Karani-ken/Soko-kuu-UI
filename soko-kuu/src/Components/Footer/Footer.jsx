import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='bg-blue-900 text-white'>
            <div className='lg:flex text-center justify-around p-1'>
                <div className='mb-1'>
                    <ul>
                        <li className='text-sm'><Link to="/help-center" className='hover:underline'>Help Center</Link></li>
                        <li className='text-sm'><Link to="/support" className='hover:underline'>Support</Link></li>
                    </ul>
                </div>
                <div className='mb-1'>
                    <ul>
                        <li className='text-sm'><Link to="/about" className='hover:underline'>About Us</Link></li>
                        <li className='text-sm'><Link to="/terms" className='hover:underline'>Terms and Conditions</Link></li>
                        <li className='text-sm'><Link to="/privacy-policy" className='hover:underline'>Privacy Policy</Link></li>
                    </ul>
                </div>
            </div>
            <div className='text-center justify-around bg-blue-400 p-1'>
                <div className='flex justify-center space-x-4 mt-2'>
                    <a href="https://www.facebook.com/profile.php?id=100094631103100" target="_blank" rel="noopener noreferrer" className='text-white hover:text-blue-900 transition duration-300'>
                        <FaFacebookF size={30} />
                    </a>
                    <a href="https://www.instagram.com/soko_kuu254/profilecard/?igsh=MTZ4MXlhZWQyOTB2ZA==" target="_blank" rel="noopener noreferrer" className='text-pink-600 hover:text-pink-900 transition duration-300'>
                        <FaInstagram size={30} />
                    </a>
                    <a href="https://www.tiktok.com/@soko_kuu254?_t=8qoXoH5encT&_r=1" target="_blank" rel="noopener noreferrer" className='text-white hover:text-gray-600 transition duration-300'>
                        <FaTiktok size={30} />
                    </a>
                    <a href="https://whatsapp.com/channel/0029VahplvpCBtxGM4fOHe2z" target="_blank" rel="noopener noreferrer" className='text-green-900 hover:text-green-800 transition duration-300'>
                        <FaWhatsapp size={30} />
                    </a>
                </div>
                <div className='flex justify-between'>
                    <p>All rights reserved &copy; Soko-Kuu Ventures - 2024</p>
                    <p>Developed By Soko-Kuu Team</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
