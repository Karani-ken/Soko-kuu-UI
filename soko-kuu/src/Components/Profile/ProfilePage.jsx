import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const ProfilePage = () => {
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        town: '',
        county: '',
        paymentDetails: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch user details from API using user ID
        const fetchUserDetails = async () => {
            // Assuming user ID is stored in local storage
            const token = localStorage.getItem('token'); // Adjust according to your implementation
            const decodedToken = jwtDecode(token);
            console.log(decodedToken)
            try {
                const response = await axios.get(`http://localhost:4000/customer/customers/${decodedToken.id}`);
                setUserDetails(response.data); // Assuming the API returns user details
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
                        {/* Username */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-1">Username</label>
                            <p className="bg-gray-100 text-gray-800 p-2 rounded-md">{userDetails.name}</p>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-1">Email</label>
                            <p className="bg-gray-100 text-gray-800 p-2 rounded-md">{userDetails.email}</p>
                        </div>

                        {/* Town */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-1">Town</label>
                            <p className="bg-gray-100 text-gray-800 p-2 rounded-md">{userDetails.town || 'N/A'}</p>
                        </div>

                        {/* County */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-1">County</label>
                            <p className="bg-gray-100 text-gray-800 p-2 rounded-md">{userDetails.county || 'N/A' }</p>
                        </div>

                        {/* Payment Details */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-1">Payment Details</label>
                            <p className="bg-gray-100 text-gray-800 p-2 rounded-md">
                                {userDetails.paymentDetails || 'No payment details available'}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
