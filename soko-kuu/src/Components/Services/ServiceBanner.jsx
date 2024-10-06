import React, { useEffect, useState } from 'react';
import Logo from '../../assets/soko-kuu.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ServiceBanner = () => {
    const [services, setServices] = useState([]);
    const [displayedService, setDisplayedService] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to fetch all services
    const fetchAllServices = async () => {
        try {
            const response = await axios.get('https://api.kelynemedia.co.ke/services/all');
            setServices(response.data); // Assuming the data is an array of services
        } catch (error) {
            console.error("Error fetching all services:", error);
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch exclusive services
    const fetchExclusiveServices = async () => {
        try {
            const response = await axios.get('https://api.kelynemedia.co.ke/services/exclusive-services');
            return response.data; // Assuming the data is an array of exclusive services
        } catch (error) {
            console.error("Error fetching exclusive services:", error);
            return [];
        }
    };

    // Function to fetch services on offer
    const fetchServicesOnOffer = async () => {
        try {
            const response = await axios.get('https://api.kelynemedia.co.ke/services/offers');
            return response.data; // Assuming the data is an array of services on offer
        } catch (error) {
            console.error("Error fetching services on offer:", error);
            return [];
        }
    };

    // Fetch services on component mount
    useEffect(() => {
        const getServices = async () => {
            const exclusiveServices = await fetchExclusiveServices();
            if (exclusiveServices.length > 0) {
                setServices(exclusiveServices);
            } else {
                const servicesOnOffer = await fetchServicesOnOffer();
                if (servicesOnOffer.length > 0) {
                    setServices(servicesOnOffer);
                } else {
                    await fetchAllServices(); // Fetch all services if no exclusive or offers are available
                }
            }
        };

        getServices();
    }, []);

    // Randomly select a service every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (services.length > 0) {
                const randomIndex = Math.floor(Math.random() * services.length);
                setDisplayedService(services[randomIndex]);
            }
        }, 10000); // 10 seconds

        // Clean up interval on unmount
        return () => clearInterval(interval);
    }, [services]);

    // Set the initially displayed service after fetching
    useEffect(() => {
        if (services.length > 0) {
            const randomIndex = Math.floor(Math.random() * services.length);
            setDisplayedService(services[randomIndex]);
        }
    }, [services]);

    // Function to get the first image URL from service_images
    const getFirstImageUrl = (service) => {
        if (service && service.service_images) {
            try {
                const images = JSON.parse(service.service_images);
                return images.length > 0 ? images[0] : null; // Return the first image URL or null
            } catch (error) {
                console.error("Error parsing service_images:", error);
                return null;
            }
        }
        return null;
    };

    return (
        <div className='bg-white py-3 h-[80vh] md:h-96 lg:h-80 mb-4 rounded-lg'>
            <h1 className='text-center text-xl font-bold my-3'>Recommended Services</h1>
            {loading ? (
                <div className="text-center">Loading...</div> // Show loading indicator while fetching
            ) : (
                <div className='lg:flex md:flex justify-between text-white bg-black rounded-md md:h-80 lg:h-72'>
                    <div className='text-center p-5 md:w-1/2 lg:w-1/2'>
                        {displayedService ? (
                            <>
                                <h1 className='font-bold text-xl mb-6'>{displayedService.service_name}</h1>
                                <p className='text-sm font-semibold my-10'>{displayedService.service_description}</p>
                                <Link to={`/servicepage/${displayedService.service_id}`} >
                                    <button className='bg-white hover:bg-blue-500 text-black p-2 md:mt-10 font-semibold rounded-3xl'>Visit Section</button>
                                </Link>
                            </>
                        ) : (
                            <p>No services available at the moment.</p>
                        )}
                    </div>
                    <div className='md:w-1/2 lg:w-1/2'>
                        {/* Display the first image from service_images if available */}
                        <img
                            src={displayedService ? getFirstImageUrl(displayedService) : Logo}
                            alt="Service Banner"
                            className='h-72 object-fill w-full'
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceBanner;
