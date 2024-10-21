import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ProfilePage = () => {
    const [userDetails, setUserDetails] = useState({
        customer_id: null,
        customer_name: '',
        phone: '',
        email: '',
        town: 'N/A', // Default value if town is empty
        county: 'N/A', // Default value if county is empty
        date_created: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch user details from API using user ID
        const fetchUserDetails = async () => {
            // Assuming user ID is stored in local storage
            const token = localStorage.getItem('token'); // Adjust according to your implementation
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            try {
                const response = await axios.get(`https://api.kelynemedia.co.ke/customer/customers/${decodedToken.id}`);
                
                // Set user details based on the API response
                setUserDetails({
                    customer_id: response.data.data.customer_id,
                    customer_name: response.data.data.customer_name,
                    phone: response.data.data.phone,
                    email: response.data.data.email,
                    town: response.data.data.town || 'N/A', // Fallback if town is empty
                    county: response.data.data.county || 'N/A', // Fallback if county is empty
                    date_created: response.data.data.date_created
                });
                setIsLoading(false);
            } catch (err) {
                setError('Failed to fetch user details.');
                setIsLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div className="min-h-screen bg-blue-900 bg-opacity-10 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">Profile Information</h1>

                {isLoading ? (
                    <p className="text-center text-gray-600">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div className="space-y-4">
                        {/* Customer Name */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-1">Customer Name</label>
                            <p className="bg-gray-100 text-gray-800 p-2 rounded-md">{userDetails.customer_name}</p>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-1">Email</label>
                            <p className="bg-gray-100 text-gray-800 p-2 rounded-md">{userDetails.email}</p>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-1">Phone</label>
                            <p className="bg-gray-100 text-gray-800 p-2 rounded-md">{userDetails.phone || 'N/A'}</p>
                        </div>

                        {/* Town */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-1">Town</label>
                            <p className="bg-gray-100 text-gray-800 p-2 rounded-md">{userDetails.town}</p>
                        </div>

                        {/* County */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-1">County</label>
                            <p className="bg-gray-100 text-gray-800 p-2 rounded-md">{userDetails.county}</p>
                        </div>

                        {/* Date Created */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-1">Date Created</label>
                            <p className="bg-gray-100 text-gray-800 p-2 rounded-md">
                                {new Date(userDetails.date_created).toLocaleDateString()} {/* Format the date */}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
