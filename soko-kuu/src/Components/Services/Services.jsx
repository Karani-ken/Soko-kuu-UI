import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import axios from 'axios';

const Services = () => {
    const [services, setServices] = useState([]); // State to store all services
    const [randomServices, setRandomServices] = useState([]); // State to store randomized services
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch all services
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('https://api.kelynemedia.co.ke/services/all');
                setServices(response.data); // Store the fetched services
                setLoading(false); // Set loading to false after fetching data
            } catch (error) {
                console.error('Error fetching services:', error);
                setLoading(false); // Set loading to false even if there's an error
            }
        };

        fetchServices();
    }, []);

    // Shuffle and select random services
    useEffect(() => {
        if (services.length > 0) {
            const shuffledServices = [...services].sort(() => 0.5 - Math.random()); // Shuffle the services
            setRandomServices(shuffledServices.slice(0, 10)); // Get the first 10 services
        }
    }, [services]);

    return (
        <div className='bg-white-100 mb-4 h-80'>
            <h1 className='text-center font-bold text-xl'>Soko-Kuu Services</h1>
            <div className='flex justify-end my-1'>
                <button className='p-1 bg-blue-400 text-white rounded mx-2'>See all</button>
            </div>
            <div className='bg-slate-100 p-5 w-full flex justify-around overflow-x-scroll rounded-md'>
                {loading ? (
                    // Render empty ServiceCards while loading
                    Array.from({ length: 10 }).map((_, index) => (
                        <ServiceCard key={index} loading={true} /> // Pass a loading prop if needed for styling
                    ))
                ) : (
                    randomServices.map((service) => (
                        <ServiceCard key={service.service_id} service={service} /> // Pass the service data to ServiceCard
                    ))
                )}
            </div>
        </div>
    );
};

export default Services;
