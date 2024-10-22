import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItem, removeCartItem } from '../../Redux/cartSlice';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

const Cart = ({ toggleCart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalPrice, loading, error } = useSelector((state) => state.cart);
 // console.log(items)
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const customer_id = decoded.id;

        if (customer_id) {
          dispatch(fetchCart(customer_id));
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [dispatch]);

  const reloadCart = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const customer_id = decoded.id;
      if (customer_id) {
        dispatch(fetchCart(customer_id));
      }
    }
  };

  const handleIncrease = (cart_item_id, quantity) => {
    dispatch(updateCartItem({ cart_item_id, quantity: quantity + 1 }));
    toast.success('Item quantity increased!');
    reloadCart();
  };

  const handleDecrease = (cart_item_id, quantity) => {
    if (quantity > 1) {
      dispatch(updateCartItem({ cart_item_id, quantity: quantity - 1 }));
      toast.info('Item quantity decreased!');
      reloadCart();
    } else if (quantity === 1) {
      handleRemove(cart_item_id);
    }
  };

  const handleRemove = (cart_item_id) => {
    dispatch(removeCartItem(cart_item_id));
    reloadCart();
  };

  const handleCheckout = () => {
    toggleCart(); // Close the cart
    navigate('/checkout'); // Navigate to the checkout page
  };

  // Handle error rendering
  const renderError = () => {
    if (typeof error === 'string') {
      return <p className="text-red-500">{error}</p>;
    }
    // If error is an object, extract a message if available
    return <p className="text-red-500">{error?.message || "An unexpected error occurred."}</p>;
  };

  if (error) return renderError();

  const totalItemsCount = items?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg relative flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        <div className="flex-grow max-h-96 overflow-y-auto">
          {items?.length > 0 ? (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.cart_item_id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
                  <div>
                    <h3 className="text-lg font-semibold">{item.product_name || "N/A"}</h3>
                    <p className="text-sm text-gray-600">Price: KES {item.product_price}</p>

                    <div className="flex items-center mt-2">
                      <button
                        className="px-2 py-1 bg-gray-300 rounded text-sm"
                        onClick={() => handleDecrease(item.cart_item_id, item.quantity)}
                      >
                        -
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-300 rounded text-sm"
                        onClick={() => handleIncrease(item.cart_item_id, item.quantity)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-lg font-bold">
                      Kes {(item.quantity * parseFloat(item.product_price)).toFixed(2)}
                    </div>
                    <button
                      className="ml-4 text-red-500 hover:text-red-700"
                      onClick={() => handleRemove(item.cart_item_id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">Your cart is empty.</p>
          )}
        </div>

        <div className="mt-6 text-right">
          <p className="text-lg font-semibold">
            Total Price: <span className="text-green-500">KES {totalPrice?.toFixed(2)}</span>
          </p>
          <p className="text-sm text-gray-600">
            Total Items: <span className="font-bold">{totalItemsCount}</span>
          </p>
        </div>

        <button
          className='text-white bg-teal-500 p-2 rounded font-semibold mt-4'
          onClick={handleCheckout}
        >
          Check out
        </button>

        <button className="absolute top-2 right-4 text-2xl text-gray-600 hover:text-gray-900" onClick={toggleCart}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Cart;
