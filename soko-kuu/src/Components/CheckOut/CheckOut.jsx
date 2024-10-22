import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOrder } from '../../Redux/orderSlice';
import { fetchCart } from '../../Redux/cartSlice';
import { jwtDecode } from 'jwt-decode';
import { FaMapMarkerAlt, FaHome, FaShoppingBag } from 'react-icons/fa'; // Import React Icons

const CheckOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalPrice } = useSelector((state) => state.cart);
  const [paymentCode, setPaymentCode] = useState('');
  const [pickupOption, setPickupOption] = useState(''); // No default, user has to choose
  const [address, setAddress] = useState('');
  const [pinLocation, setPinLocation] = useState(false);
  const [deliveryArea, setDeliveryArea] = useState('nyeri');
  const [deliveryFee, setDeliveryFee] = useState(0); // Start with 0 delivery fee
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

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
      'Chania': 50,
      'Farmland': 50,
      'Kangemi': 50,
      'Asian Quarter': 50,
      'Gatitu': 150,
      'Dekut': 150,
      'Embassy': 150,
      'Gamerock': 150,
      'Citam': 150,
    };

    if (pickupOption === 'delivery' && address) {
      setDeliveryFee(deliveryFees[address] || 0);
    } else {
      setDeliveryFee(0); // No delivery fee for pick-up option
    }
  }, [address, pickupOption]);

  // Handle checkout submit
  // Handle checkout submit
  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!paymentCode || (pickupOption === 'delivery' && (!address || (pinLocation && !deliveryArea)))) {
      toast.error('Please fill in all required fields');
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const customer_id = decoded.id;

      // Set location based on pickup option
      const location = pickupOption === 'pickup' ? 'Pamki House' : address;

      const orderData = {
        customer_id,
        payment_code: paymentCode,
        cart_id: items[0].cart_id,
        items: items.map(item => ({
          product_id: item.product_id,
          product_name: item.product_name,
          product_price: item.product_price,
          quantity: item.quantity,
        })),
        location,  // Set location dynamically based on user selection
        location_pin: pinLocation ? userLocation : null,  // Set pinned location if available
        totalAmount: totalPrice + deliveryFee,
      };
      console.log(orderData);

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


  // Get User Location Function
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords; // Extract latitude and longitude
          setUserLocation(`${latitude},${longitude}`); // Store them in an array
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

        {/* Pickup or Delivery Option */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Pickup Option</label>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className={`w-full p-3 flex items-center justify-center border rounded-lg ${pickupOption === 'pickup' ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setPickupOption('pickup')}
            >
              <FaShoppingBag className="mr-2" />
              Pick Up from Office
            </button>
            <button
              type="button"
              className={`w-full p-3 flex items-center justify-center border rounded-lg ${pickupOption === 'delivery' ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setPickupOption('delivery')}
            >
              <FaHome className="mr-2" />
              Delivery
            </button>
          </div>
        </div>

        {/* Conditional Render: Pickup - Show Pamki House */}
        {pickupOption === 'pickup' && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Pick-up Location</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200"
              value="Pamki House"
              readOnly
            />
          </div>
        )}

        {/* Conditional Render: Delivery - Show Address Options */}
        {pickupOption === 'delivery' && (
          <>
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
                <option value="Chania">Chania</option>
                <option value="Farmland">Farmland</option>
                <option value="Kangemi">Kangemi</option>
                <option value="Asian Quarter">Asian Quarter</option>
                <option value="Gatitu">Gatitu</option>
                <option value="Dekut">Dekut</option>
                <option value="Embassy">Embassy</option>
                <option value="Gamerock">Gamerock</option>
                <option value="Citam">Citam</option>
              </select>
            </div>

            {/* Pin Location Option */}
            <div className="flex items-center mb-4">
              <button
                type="button"
                onClick={getLocation}
                className="flex items-center justify-center p-3 border rounded-lg bg-teal-500 text-white"
              >
                <FaMapMarkerAlt className="mr-2" />
                Pin Location
              </button>
              {pinLocation && (
                <span className="ml-4 text-green-600">Location pinned!</span>
              )}
            </div>
          </>
        )}

        {/* Order Summary */}
        <div className="border p-4 rounded-lg shadow-md">
          <h3 className="font-bold text-lg">Order Summary</h3>
          <ul className="mt-2">
            {items.map((item) => (
              <li key={item.product_id} className="flex justify-between">
                <span>{item.product_name} (x{item.quantity})</span>
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
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckOut;
