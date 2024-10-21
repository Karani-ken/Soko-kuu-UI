import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaPhone, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordComplexity = (password) => {
    const regex = {
      length: /.{8,}/,
      upper: /[A-Z]/,
      lower: /[a-z]/,
      number: /\d/,
      special: /[!@#$%^&*(),.?":{}|<>]/,
    };

    return regex.length.test(password) &&
      regex.upper.test(password) &&
      regex.lower.test(password) &&
      regex.number.test(password) &&
      regex.special.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    if (phone.length !== 10) {
      setError("Phone number must be 10 digits long.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (!passwordComplexity(password)) {
      setError("Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://api.kelynemedia.co.ke/customer/register', {
        customer_name: customerName,
        phone,
        email,
        password,
      });
      setSuccessMessage(response.data.message);
      setCustomerName('');
      setPhone('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while registering.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex items-center h-screen justify-center ">
      <div className="bg-white shadow-md opacity-80 z-50   rounded-lg p-6 max-w-2xl w-full  bg-opacity-90 backdrop-filter backdrop-blur-lg">
        <h2 className="col-span-2 text-2xl font-bold mb-4 text-center text-blue-900 flex items-center justify-center">
          <FaUser className="mr-2" />
          Sign up
        </h2>

        {error && <p className="text-red-500 col-span-2 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 col-span-2 mb-4">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="col-span-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerName">
                <FaUser className="mr-1" />
                Name
              </label>
              <input
                type="text"
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                <FaPhone className="mr-1" />
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                pattern="\d{10}"
                maxLength={10}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
              <p className="text-gray-500 text-xs mt-1">Please enter a 10-digit phone number.</p>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              <FaEnvelope className="mr-1" />
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
          <div className="grid grid-cols-2 gap-3">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                <FaLock className="mr-1" />
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
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-1">Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                <FaLock className="mr-1" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

          </div>

          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-200 w-full"
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
                Submitting...
              </div>
            ) : (
              'Sign up'
            )}
          </button>
        </form>

        <div className="text-center col-span-2 mt-4">
          <p className="text-gray-700 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-900 font-bold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
