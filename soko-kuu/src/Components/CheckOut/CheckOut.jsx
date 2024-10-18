import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOrder } from '../../Redux/orderSlice';
import { fetchCart } from '../../Redux/cartSlice';
import { jwtDecode } from 'jwt-decode';

const CheckOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalPrice } = useSelector((state) => state.cart);
  const [paymentCode, setPaymentCode] = useState('');
  const [pickupStation, setPickupStation] = useState('');
  const [address, setAddress] = useState('');
  const [pinLocation, setPinLocation] = useState(false);
  const [deliveryArea, setDeliveryArea] = useState('nyeri');
  const [deliveryFee, setDeliveryFee] = useState(50); // Default delivery fee for within Nyeri Town

  // Fetch the cart details on load
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

  // Handle delivery fee calculation based on the delivery area
  useEffect(() => {
    const deliveryFees = {
      'Kandara': 100,
      'RingRoad': 100,
      'Kamakwa': 100,
      'Outspan': 100,
      'Kamuyu': 100,
      "King'ong'o": 100,
      'Ruring\'u': 100,
      'Skuta': 100,
      'Classic': 100,
      'Ngangarithi': 50,
      'chania': 50,
      'farmland': 50,
      'Kangemi': 50,
      'asian Quater': 50,
      'Gatitu': 150,
      'Dekut': 150,
      'Embassy': 150,
      'Gamerock': 150,
      'Citam': 150,
    };

    setDeliveryFee(deliveryFees[address] || 0); // Update delivery fee based on selected address
  }, [address]);

  // Handle checkout submit
  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!paymentCode || !pickupStation || !address) {
      toast.error('Please fill in all required fields');
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const customer_id = decoded.id;

      const orderData = {
        customer_id,
        payment_code: paymentCode,
        items: items.map(item => ({
          product_id: item.product_id,
          product_name: item.product_name,
          product_price: item.product_price,
          quantity: item.quantity,
        })),
        pickup_station: pickupStation,
        address,
        delivery_fee: deliveryFee, // Add delivery fee to the order data
      };

      dispatch(createOrder(orderData))
        .then((response) => {
          if (response.type === 'order/createOrder/fulfilled') {
            toast.success('Order created successfully');
            navigate('/order-success');
          } else {
            toast.error('Failed to create order');
          }
        });
    }
  };

  return (
    <div className="checkout-page max-w-3xl min-h-screen my-4 border mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">Checkout</h2>

      <form onSubmit={handleCheckout} className="space-y-6">
        {/* Payment Code */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Payment Code</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={paymentCode}
            onChange={(e) => setPaymentCode(e.target.value)}
            placeholder="Enter payment code"
            required
          />
        </div>

        {/* Pickup Station */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Pickup Station</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={pickupStation}
            onChange={(e) => setPickupStation(e.target.value)}
            required
          >
            <option value="">Select pickup station</option>
            <option value="Station A">Pamki House</option>
          
          </select>
        </div>

        {/* Delivery Address */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Delivery Address</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          >
            <option value="">Select delivery address</option>
            <option value="Kandara">Kandara</option>
            <option value="RingRoad">RingRoad</option>
            <option value="Kamakwa">Kamakwa</option>
            <option value="Outspan">Outspan</option>
            <option value="Kamuyu">Kamuyu</option>
            <option value="King'ong'o">King'ong'o</option>
            <option value="Ruring'u">Ruring'u</option>
            <option value="Skuta">Skuta</option>
            <option value="Classic">Classic</option>
            <option value="Ngangarithi">Ngangarithi</option>
            <option value="chania">chania</option>
            <option value="farmland">farmland</option>
            <option value="Kangemi">Kangemi</option>
            <option value="asian Quater">asian Quater</option>
            <option value="Gatitu">Gatitu</option>
            <option value="Dekut">Dekut</option>
            <option value="Embassy">Embassy</option>
            <option value="Gamerock">Gamerock</option>
            <option value="Citam">Citam</option>
          </select>
        </div>

        {/* Pin Location Option */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Pin Your Location</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={pinLocation}
              onChange={() => setPinLocation(!pinLocation)}
              className="mr-2"
            />
            <span className="text-gray-600">I want to pin my location</span>
          </div>
          {pinLocation && (
            <div className="mt-4">
              <label className="block mb-2 font-semibold text-gray-700">Delivery Area</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={deliveryArea}
                onChange={(e) => setDeliveryArea(e.target.value)}
              >
                <option value="nyeri">Within Nyeri Town</option>
                <option value="outside">Outside Nyeri Town</option>
              </select>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <ul className="mb-4 space-y-2">
            {items?.map((item) => (
              <li key={item.product_id} className="flex justify-between text-gray-700">
                <span>{item.product_name} - {item.quantity} x {item.product_price}</span>
                <span>KES {(item.quantity * parseFloat(item.product_price)).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="text-lg font-bold text-gray-900">Subtotal: KES {totalPrice?.toFixed(2)}</p>
          <p className="text-lg font-bold text-gray-900">Delivery Fee: KES {deliveryFee}</p>
          <p className="text-lg font-bold text-gray-900">Total: KES {(totalPrice + deliveryFee)?.toFixed(2)}</p>
        </div>

        {/* Disclaimer */}
        <div className="mb-4 text-sm text-gray-600">
          <p>* Delivery charges depend on the selected delivery area.</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckOut;
