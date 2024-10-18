import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Orders = () => {
    // Dummy order data (could later be fetched from an API)
    const [orders, setOrders] = useState([]);
  
    // Simulate fetching data from an API (for now, using the provided dummy data)
    useEffect(() => {
        const dummyOrderData = {
            order: [
                {
                    order_id: 1,
                    customer_id: 1,
                    payment_code: 'PAY123456',
                    order_status: 'Pending',
                    date_created: '2024-10-16T07:58:14.000Z',
                    date_updated: '2024-10-16T07:58:14.000Z'
                }
            ],
            order_items: [
                {
                    order_item_id: 1,
                    order_id: 1,
                    product_id: 29,
                    product_name: 'Some Product ABC',
                    product_price: '100.00',
                    quantity: 5,
                    date_added: '2024-10-16T07:58:14.000Z'
                }
            ]
        };
        setOrders([dummyOrderData]); // You can expand this with more orders
    }, []);




    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Orders</h1>

            {orders.length === 0 ? (
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
    const { order, order_items } = orderData;
    const navigate = useNavigate()
    const orderDetails = order[0];
    const navigateToTracker = () => {
        navigate('/track-order')
    }
    return (
        <div className="bg-white shadow-md min-h-screen rounded-lg mb-6 p-6">
            <h2 className="text-xl font-semibold mb-2">Order #{orderDetails.order_id}</h2>
            <button className='text-white bg-blue-800 p-2 rounded-md hover:bg-blue-400' onClick={navigateToTracker}
            >Track order</button>
            <div className="flex justify-between mb-4">
                <div>
                    <p><strong>Payment Code:</strong> {orderDetails.payment_code}</p>
                    <p><strong>Status:</strong> <span className={`text-${orderDetails.order_status === 'Pending' ? 'yellow-500' : 'green-500'}`}>{orderDetails.order_status}</span></p>
                    <p><strong>Date Created:</strong> {new Date(orderDetails.date_created).toLocaleString()}</p>
                </div>
                <div>
                    <p><strong>Customer ID:</strong> {orderDetails.customer_id}</p>
                    <p><strong>Last Updated:</strong> {new Date(orderDetails.date_updated).toLocaleString()}</p>
                </div>
            </div>

            <h3 className="text-lg font-semibold mb-2">Order Items</h3>
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
                    {order_items.map((item) => (
                        <tr key={item.order_item_id}>
                            <td className="border p-2">{item.product_name}</td>
                            <td className="border p-2">{item.quantity}</td>
                            <td className="border p-2">${item.product_price}</td>
                            <td className="border p-2">${(item.quantity * parseFloat(item.product_price)).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
