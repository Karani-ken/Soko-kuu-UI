import React from 'react'

const Footer = () => {
  return (
    <div className='bg-blue-900 text-white '>
        <div className='lg:flex text-center justify-around'>
        <div className='mb-2'>
            <h1 className='font-semibold'>Need Help?</h1>
            <ul>
                <li className='text-sm'>contact us</li>
                <li className='text-sm'>Support</li>
            </ul>
        </div>
        <div className='mb-2'>
            <h1 className='font-semibold'>About Soko-kuu</h1>
            <ul>
                <li className='text-sm'>About us</li>
                <li className='text-sm'>Terms and Conditions</li>
            </ul>
        </div>
        <div className='mb-2'>
            <h1 className='font-semibold'>Useful Links</h1>
            <ul>
                <li className='text-sm'>Sell on Soko-Kuu</li>
                <li className='text-sm'>Stores</li>
            </ul>
        </div>
        <div className='mb-2'>
            <h1 className='font-semibold'>Social Media</h1>
            <ul>
                <li className='text-sm'>Facebook</li>
                <li className='text-sm'>Instagram</li>
            </ul>
        </div>
        <div>
            <h1 className='font-semibold'>Download App</h1>
          <p className='text-sm'>Playstore</p>
        </div>
        </div>
        <div className='md:flex text-center justify-around  bg-blue-400'>
            <p>All rights reserved &copy; Soko-Kuu Ventures - 2024</p>
            <p>Developed By Soko-Kuu Team</p>
        </div>

    </div>
  )
}

export default Footer