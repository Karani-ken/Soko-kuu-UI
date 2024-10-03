import React from 'react'
import BannerImage from '../../assets/salon.jpg'
const ServiceBanner = () => {
  return (
    <div className='bg-white py-3  mb-4 rounded-lg'>
        <h1 className='text-center text-xl font-bold my-3'>Recommended Services</h1>
        <div className='lg:flex justify-center text-white bg-black rounded-md h-72 '>
            <div className='text-center p-5 lg:w-1/2'>
                <h1 className='font-bold text-xl mb-6'>Salon and Barber Shops</h1>
                <p className='text-sm font-semibold my-10'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Quod sequi aut neque odio esse fugit porro,
                     dolore est maxime expedita culpa repellendus eaque
                      doloribus pariatur, at nobis dolores, nemo rem.
                </p>

                <button className='bg-white text-black p-2 md:mt-10 font-semibold rounded-3xl'>Visit Section</button>
            </div>
            <div>
                <img src={BannerImage} alt="" className='h-72' />
            </div>

        </div>
        
    </div>
  )
}

export default ServiceBanner