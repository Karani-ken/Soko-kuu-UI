import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image1 from '../../assets/salon.jpg';
import ServiceCard from './ServiceCard';
const ServicePage = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/store')
    }
    return (
        <div className="min-h-screen my-4">
            <div
                className="h-[75vh] bg-cover bg-center relative"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(0, 0, 128, 0.9)), url(${Image1})`,
                }}
            >
                {/* Content inside the background */}
                <div className="p-3 text-center">
                    <h1 className="text-4xl font-bold text-white mt-2">Hair Services</h1>
                    <p className='text-white my-4 font-medium'>Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Ad explicabo nostrum modi
                        ratione soluta, beatae sapiente nihil voluptas aspernatur,
                        neque magnam nulla amet ullam minus quidem, ut praesentium? Beatae, tenetur.
                    </p>
                    <h1 className='font-bold text-xl text-white'>Service Pictorials</h1>
                    <div className='flex justify-around mt-4 overflow-x-scroll'>
                        <img src={Image1} alt="image 1" className='w-80 mx-2' />
                        <img src={Image1} alt="image 1" className='w-80 mx-2' />
                        <img src={Image1} alt="image 1" className='w-80' />
                    </div>
                    <div className='flex justify-center mt-4'>
                        <button className='bg-white hover:bg-slate-400 p-2 m-2'>Book Service</button>
                        <button className='bg-blue-500 hover:bg-blue-800 text-white p-2 m-2' onClick={handleNavigate}>Visit Provider</button>
                    </div>
                </div>
            </div>

            <div className='bg-white-100  mb-4  my-4'>
                <h1 className='text-center font-bold  text-xl'> Similar Services </h1>
                <div className='flex justify-end my-1'>
                    <button className='p-1 bg-blue-400 text-white rounded mx-2'>See all</button>
                </div>
                <div className='bg-slate-100 p-5 w-full  flex justify-around overflow-x-scroll rounded-md '>
                    <ServiceCard />
                    <ServiceCard />
                    <ServiceCard />
                    <ServiceCard />
                    <ServiceCard />
                </div>

            </div>
        </div>
    );
};

export default ServicePage;
