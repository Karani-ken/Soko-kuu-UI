import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Image1 from '../../assets/salon.jpg'; // Fallback image if service image is unavailable
import ServiceCard from './ServiceCard';
import axios from 'axios';

const ServicePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [serviceImages, setServiceImages] = useState([]); // State for parsed images
    const [similarServices, setSimilarServices] = useState([]); // State for similar services

    // Fetch the service from the API
    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(`https://api.kelynemedia.co.ke/services/service/${id}`);
                console.log(response.data);
                setService(response.data); // Set service details

                // Parse the service_images JSON string into an array
                if (response.data.service_images) {
                    const imagesArray = JSON.parse(response.data.service_images);
                    setServiceImages(imagesArray); // Set the parsed images
                }

                // Fetch similar services based on the service's category
                if (response.data.category) {
                    const similarResponse = await axios.get(`https://api.kelynemedia.co.ke/services/categories/${response.data.category}`);
                    setSimilarServices(similarResponse.data); // Assuming the response contains the similar services
                }
            } catch (error) {
                console.error("Error fetching service:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]);

    const handleNavigate = (id) => {
        navigate(`/store/${id}`); // Navigate to the provider's page using user ID
    }
    const formattedPhoneNumber = (phone) => {
        // Check if the phone number starts with '0'
        if (phone.startsWith('0')) {
            // Remove the leading '0' and return the rest of the number
            return phone.slice(1);
        }
        // If it doesn't start with '0', return the number as it is
        return phone;
    };


    return (
        <div className="min-h-screen my-4">
            {loading ? (
                <div className="text-center">Loading...</div> // Show loading indicator while fetching
            ) : (
                <>
                    <div
                        className="md:h-[85vh] lg:h-[85vh] h-[75vh] bg-cover bg-center relative"
                        style={{
                            backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(0, 0, 128, 0.9)), url(${serviceImages.length > 0 ? serviceImages[0] : Image1})`, // Use first image or fallback
                        }}
                    >
                        {/* Content inside the background */}
                        <div className="p-3 text-center">
                            <h1 className="text-4xl font-bold text-white mt-2">{service.service_name}</h1> {/* Use service name */}
                            <p className='text-white my-4 font-medium'>{service.service_description}</p> {/* Use service description */}
                            <h1 className='font-bold text-xl text-white'>Service Pictorials</h1>
                            <div className='flex justify-around mt-4 overflow-x-auto'>
                                {serviceImages.map((image, index) => (
                                    <img key={index} src={image} alt={`Service pictorial ${index + 1}`} className='w-80 mx-2' />
                                ))}
                            </div>
                            <div className='flex justify-center mt-4'>
                                <button className='bg-white hover:bg-slate-400 p-2 m-2'
                                    onClick={() => {
                                        const currentUrl = window.location.href; // Get the current URL
                                        const message = `Hello, I found this service on Soko-kuu. I'd love to inquire about it: ${currentUrl}`;
                                        window.open(`https://wa.me/+254${formattedPhoneNumber(service.user_contact)}?text=${encodeURIComponent(message)}`, '_blank');
                                    }}
                                >Book Service</button>
                                <button
                                    className='bg-blue-500 hover:bg-blue-800 text-white p-2 m-2'
                                    onClick={() => handleNavigate(service.user_id)}
                                >
                                    Visit Provider
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white-100 mb-4 my-4'>
                        <h1 className='text-center font-bold text-xl'>Similar Services</h1>
                        <div className='flex justify-end my-1'>
                            <button className='p-1 bg-blue-400 text-white rounded mx-2'>See all</button>
                        </div>
                        <div className='bg-slate-100 p-5 w-full flex justify-around overflow-x-scroll rounded-md'>
                            {similarServices.length > 0 ? (
                                similarServices.map((service) => (
                                    <ServiceCard key={service.service_id} service={service} /> // Pass service data to ServiceCard
                                ))
                            ) : (
                                <p className='text-center'>No similar services found.</p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ServicePage;
