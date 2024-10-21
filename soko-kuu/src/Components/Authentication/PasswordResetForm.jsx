import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
const PasswordResetForm = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [currentEmail, setCurrentEmail] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken.email)
            setCurrentEmail(decodedToken.email)
        }
    }, [])

    // Function to mask the email (show only first and last character)
    const maskEmail = (email) => {
        const [localPart, domain] = email.split('@')
        if (localPart.length > 0) {
            const firstChar = localPart[0];
            const lastChar = localPart[localPart.length - 1]
            const maskedLocal = `${firstChar}**********${lastChar}`;
            return `${maskedLocal}@${domain}`
        }
        return email;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsLoading(true);

        try {
            const response = await axios.post('https://api.kelynemedia.co.ke/customer/send-otp', { email });
            setSuccessMessage(response.data.message);
            setEmail(''); // Clear the input field
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-900 bg-opacity-10">
            <div className="bg-white shadow-md rounded px-8 py-6 max-w-md w-full">
                <p>A Password reset OTP will be sent to the email: {maskEmail(currentEmail)}</p>
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">Request Password Reset</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {successMessage && (
                    <p className="text-green-500 mb-4">
                        {successMessage}. Please check your email.
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
                            placeholder="Enter your email"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-900 text-white font-bold py-2 px-4 rounded hover:bg-blue-400 transition duration-200 w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <svg
                                    className="animate-spin h-5 w-5 text-white mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    ></path>
                                </svg>
                                Sending OTP...
                            </div>
                        ) : (
                            'Send OTP'
                        )}
                    </button>

                    <Link to='/reset-form' >
                        <button className='p-2 hover:bg-teal-900 w-full text-center bg-teal-500 font-bold text-white mt-2 rounded'>
                            Proceed to Reset
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default PasswordResetForm;
