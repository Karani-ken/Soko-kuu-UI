import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsLoading(true);

        try {
            const response = await axios.post('https://api.kelynemedia.co.ke/customer/customers/login', {
                email,
                password
            });

            const token = response.data;
            const expirationTime = new Date().getTime() + 12 * 60 * 60 * 1000; // 12 hours in milliseconds

            // Store the token and expiration time in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExpiration', expirationTime);

            setSuccessMessage('Login successful');
            setEmail('');
            setPassword('');
            navigate('/');
            window.location.reload();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to login.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // Full-screen background overlay
        <div className=" flex items-center justify-center min-h-screen">
            {/* Modal Box */}
            <div className="bg-white shadow-lg rounded-lg border-2 px-8 py-6 w-full max-w-md relative z-50">
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-900 flex items-center justify-center">
                    Sign in
                </h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            <FaEnvelope className="mr-1 text-blue-900" />
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            <FaLock className="mr-1 text-blue-900" />
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-900"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-900 text-white font-bold py-2 px-4 rounded hover:bg-blue-400 transition duration-200 w-full"
                        disabled={isLoading} // Disable button while loading
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
                                Logging in...
                            </div>
                        ) : (
                            'Login'
                        )}
                    </button>
                    <div className="mt-4">
                        <Link to='/signup' className='text-blue-600 m-2'>Not yet a customer? Sign up.</Link> <br />
                        <Link to='/password-reset' className='text-blue-400 m-2'>Forgot Password?</Link>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Login;
