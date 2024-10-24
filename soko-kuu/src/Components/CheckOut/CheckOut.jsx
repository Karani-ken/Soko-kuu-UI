import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOrder } from '../../Redux/orderSlice';
import { fetchCart } from '../../Redux/cartSlice';
import { jwtDecode } from 'jwt-decode';
import {
  FaMapMarkerAlt,
  FaHome,
  FaShoppingBag,
  FaCreditCard,
  FaCheckCircle,
} from 'react-icons/fa';

const CheckOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalPrice } = useSelector((state) => state.cart);
  const [paymentCode, setPaymentCode] = useState('');
  const [pickupOption, setPickupOption] = useState('');
  const [address, setAddress] = useState('');
  const [pinLocation, setPinLocation] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);

  // Fetch cart details on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const customer_id = decoded.id;
      if (customer_id) {
        dispatch(fetchCart(customer_id));
      }
    }
  }, [dispatch]);

  // Fetch delivery addresses from the API
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch('https://api.kelynemedia.co.ke/locations/all');
        const data = await response.json();
        setDeliveryAddresses(data);
      } catch (error) {
        console.error('Failed to fetch delivery addresses:', error);
        toast.error('Failed to load delivery addresses');
      }
    };

    fetchAddresses();
  }, []);

  // Handle delivery fee calculation
  useEffect(() => {
    const selectedAddress = deliveryAddresses.find(
      (addr) => addr.location_name === address
    );
    if (pickupOption === 'delivery' && selectedAddress) {
      setDeliveryFee(parseFloat(selectedAddress.charges));
    } else {
      setDeliveryFee(0);
    }
  }, [address, pickupOption, deliveryAddresses]);

  // Handle checkout submit
  const handleCheckout = async (e) => {
    e.preventDefault();

    if (currentStep === 1) {
      if (!pickupOption || (pickupOption === 'delivery' && !address)) {
        toast.error('Please select a delivery address');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!paymentCode) {
        toast.error('Please enter the payment code');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        const customer_id = decoded.id;

        const location = pickupOption === 'pickup' ? 'Pamki House' : address;

        const orderData = {
          customer_id,
          payment_code: paymentCode,
          cart_id: items[0].cart_id,
          items: items.map((item) => ({
            product_id: item.product_id,
            product_name: item.product_name,
            product_price: item.product_price,
            quantity: item.quantity,
          })),
          location,
          location_pin: pinLocation ? userLocation : null,
          totalAmount: totalPrice + deliveryFee,
        };

        try {
          const response = await dispatch(createOrder(orderData)).unwrap();
          toast.success('Order created successfully');
          navigate('/order-success');
        } catch (error) {
          console.error('Failed to create order:', error);
          toast.error('Failed to create order');
        }
      }
    }
  };

  // Get User Location Function
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation(`${latitude},${longitude}`);
          toast.success('Location pinned successfully!');
          setPinLocation(true);
        },
        () => {
          toast.error('Unable to retrieve your location');
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser');
    }
  };

  return (
    <div className="checkout-page max-w-3xl min-h-screen my-4 mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-bold text-teal-600 mb-6 text-center">Checkout</h2>

      {/* Step Indicator */}
      <div className="flex justify-between items-center mb-6">
        <div
          className={`step-indicator px-4 py-2 rounded-full ${
            currentStep === 1
              ? 'bg-teal-600 text-white font-bold'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          1. Address
        </div>
        <div
          className={`step-indicator px-4 py-2 rounded-full ${
            currentStep === 2
              ? 'bg-teal-600 text-white font-bold'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          2. Payment
        </div>
        <div
          className={`step-indicator px-4 py-2 rounded-full ${
            currentStep === 3
              ? 'bg-teal-600 text-white font-bold'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          3. Summary
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleCheckout} className="space-y-6">
        {/* Step 1: Delivery Address */}
        {currentStep === 1 && (
          <>
            <h3 className="text-2xl font-semibold text-teal-600 mb-4">
              Select Delivery Address
            </h3>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-700">
                Pickup Option
              </label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className={`w-full p-3 flex items-center justify-center border rounded-lg transition-transform transform ${
                    pickupOption === 'pickup'
                      ? 'bg-teal-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setPickupOption('pickup')}
                >
                  <FaShoppingBag className="mr-2" />
                  Pick Up from Office
                </button>
                <button
                  type="button"
                  className={`w-full p-3 flex items-center justify-center border rounded-lg transition-transform transform ${
                    pickupOption === 'delivery'
                      ? 'bg-teal-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setPickupOption('delivery')}
                >
                  <FaHome className="mr-2" />
                  Delivery
                </button>
              </div>
            </div>

            {/* Conditional Render: Pickup */}
            {pickupOption === 'pickup' && (
              <div className="mb-4">
                <label className="block mb-2 font-semibold text-gray-700">
                  Pick-up Location
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed"
                  value="Pamki House"
                  readOnly
                />
              </div>
            )}

            {/* Conditional Render: Delivery */}
            {pickupOption === 'delivery' && (
              <div className="mb-4">
                <label className="block mb-2 font-semibold text-gray-700">
                  Delivery Address
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                >
                  <option value="">Select delivery address</option>
                  {deliveryAddresses.map((addr) => (
                    <option key={addr.location_id} value={addr.location_name}>
                      {addr.location_name} - KSH {addr.charges}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Pin Location */}
            {pickupOption === 'delivery' && (
              <div className="flex items-center mb-4">
                <button
                  type="button"
                  onClick={getLocation}
                  className="flex items-center justify-center p-3 border rounded-lg bg-teal-500 text-white shadow-md hover:shadow-lg transition duration-200"
                >
                  <FaMapMarkerAlt className="mr-2" />
                  Pin Location
                </button>
                {pinLocation && (
                  <span className="ml-4 text-green-600 flex items-center">
                    <FaCheckCircle className="mr-2" /> Location pinned!
                  </span>
                )}
              </div>
            )}
          </>
        )}

        {/* Step 2: Payment Code */}
        {currentStep === 2 && (
          <>
            <p>
              Payment instructions: <br />
              1. Go to Lipa na M-Pesa. <br />
              2. Select Paybill. <br />
              3. Enter Business Number: <b>880100</b> <br />
              4. Account Number: <b>282803</b> <br />
              5. Amount of : <b>KSH {totalPrice + deliveryFee}</b> <br />
              6. Enter Your M-Pesa pin.
            </p>
            <p>
              Account Name is: <b>Kelyne Media Solutions</b>
            </p>
            <h3 className="text-2xl font-semibold text-teal-600 mb-4">
              Enter Payment Code
            </h3>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-700">
                Transaction Code
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <FaCreditCard className="p-3 text-gray-600" />
                <input
                  type="text"
                  className="flex-grow p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={paymentCode}
                  onChange={(e) => setPaymentCode(e.target.value)}
                  maxLength={10}
                  placeholder="Enter transaction code (max 10 characters) e.g, SJ0688JQJG"
                  required
                />
              </div>
              <div className="mt-4 text-lg font-bold">
                <span>
                  Total Amount (Including Delivery Fee): KSH {totalPrice + deliveryFee}
                </span>
              </div>
            </div>
          </>
        )}

        {/* Step 3: Order Summary */}
        {currentStep === 3 && (
          <>
            <h3 className="text-2xl font-semibold text-teal-600 mb-4">
              Order Summary
            </h3>
            <div className="border p-4 rounded-lg shadow-md">
              <h4 className="font-bold text-lg">Your Order Details</h4>
              <div className="mt-2 mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-600" />
                <span>{pickupOption === 'pickup' ? 'Pamki House' : address}</span>
              </div>
              <div className="mb-4 flex items-center">
                <FaCreditCard className="mr-2 text-gray-600" />
                <span>{paymentCode}</span>
              </div>
              <h5 className="font-semibold">Order Items:</h5>
              <ul className="mt-2">
                {items.map((item) => (
                  <li key={item.product_id} className="flex justify-between">
                    <span>
                      {item.product_name} (x{item.quantity})
                    </span>
                    <span>KSH {item.product_price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between mt-4 font-bold">
                <span>Total Price:</span>
                <span>KSH {totalPrice + deliveryFee}</span>
              </div>
              {pickupOption === 'delivery' && (
                <div className="flex justify-between mt-2 font-bold">
                  <span>Delivery Fee:</span>
                  <span>KSH {deliveryFee}</span>
                </div>
              )}
              <div className="mt-4 text-sm text-gray-600">
                <p>Disclaimer: The price includes VAT and delivery fees.</p>
              </div>
            </div>
          </>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="w-full p-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="w-full p-3 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition duration-200"
          >
            {currentStep === 3 ? 'Place Order' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOut;
