import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // For loading state
    const navigate = useNavigate();

    // Function to decode JWT and get customer_id
    const getCustomerIdFromToken = () => {
        const token = localStorage.getItem('token'); // Assuming the JWT token is stored under 'token'
        if (!token) return null;

        try {
            const decodedToken = jwtDecode(token); // Decode the JWT
            return decodedToken.id; // Replace 'id' with the correct key in your token
        } catch (error) {
            console.error('Invalid token:', error);
            return null;
        }
    };

    // Fetch orders when the component mounts
    useEffect(() => {
        const customer_id = getCustomerIdFromToken(); // Get customer_id from the JWT token

        if (customer_id) {
            const fetchOrders = async () => {
                try {
                    const response = await fetch(`https://api.kelynemedia.co.ke/orders/customer-orders/${customer_id}`); // Fetch orders
                    if (!response.ok) {
                        throw new Error('Failed to fetch orders');
                    }
                    const data = await response.json(); // Parse JSON response
                    setOrders(data); // Set orders in state
                } catch (error) {
                    console.error('Error fetching orders:', error);
                } finally {
                    setLoading(false); // Set loading to false
                }
            };

            fetchOrders(); // Call the fetch function
        } else {
            console.error('Customer ID not found. User may not be logged in.');
            navigate('/login'); // Redirect to login if no customer ID found
        }
    }, [navigate]);

    return (
        <div className="container min-h-screen mx-auto px-2 sm:px-4 py-8">
            <h1 className="text-xl sm:text-2xl font-bold mb-6">Orders</h1>

            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : orders.length === 0 ? (
                <p className="text-center text-gray-600">No orders available</p>
            ) : (
                orders.map((orderData, index) => (
                    <OrderCard key={index} orderData={orderData} />
                ))
            )}
        </div>
    );
};

// Component to display individual order card
const OrderCard = ({ orderData }) => {
    const { order_id, payment_code, order_status, date_created, date_updated, items } = orderData;
    const navigate = useNavigate();

    // Function to calculate the total price for the order
    const calculateOrderTotal = () => {
        return items.reduce((total, item) => {
            return total + (item.quantity * parseFloat(item.product_price));
        }, 0).toFixed(2); // Reduce items to sum total price and format to 2 decimal places
    };

    const navigateToTracker = () => {
        navigate('/track-order', { state: { order_status } }); // Passing the order status to the tracking page
    };

    return (
        <div className="bg-white min-h-screen shadow-md rounded-lg mb-6 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Order #{order_id}</h2>
            <button
                className='text-white bg-blue-800 p-2 rounded-md hover:bg-blue-400'
                onClick={navigateToTracker}
            >
                Track order
            </button>
            <div className="sm:flex sm:justify-between mb-4">
                <div>                  
                    <p><strong>Status:</strong> <span className={`text-${order_status === 'Pending' ? 'yellow-500' : 'green-500'}`}>{order_status}</span></p>
                    <p><strong>Date Created:</strong> {new Date(date_created).toLocaleString()}</p>
                </div>
                <div>
                    <p><strong>Last Updated:</strong> {new Date(date_updated).toLocaleString()}</p>
                </div>
            </div>

            <h3 className="text-lg font-semibold mb-2">Order Items</h3>
            <div className="overflow-x-auto"> {/* Make the table scrollable horizontally on small devices */}
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2 text-left">Product Name</th>
                            <th className="border p-2 text-left">Quantity</th>
                            <th className="border p-2 text-left">Price</th>
                            <th className="border p-2 text-left">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.order_item_id}>
                                <td className="border p-2">{item.product_name}</td>
                                <td className="border p-2">{item.quantity}</td>
                                <td className="border p-2">kes {item.product_price}</td>
                                <td className="border p-2">kes {(item.quantity * parseFloat(item.product_price)).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Display the total price for the order */}
            <div className="text-right font-semibold text-lg mt-4">
                Order Total: <sup>Kes </sup>{calculateOrderTotal()}
            </div>
        </div>
    );
};

export default Orders;
