import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector to access the Redux state
import { addItemToCart, updateCartItem, fetchCart } from '../../Redux/cartSlice'; // Import your Redux actions
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/soko-kuu.png';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the current cart items from Redux state
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux state


  // Function to decode JWT and get customer_id
  const getCustomerIdFromToken = () => {
    const token = localStorage.getItem('token'); // Assuming the JWT token is stored under 'token'
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token); // Decode the JWT

      console.log(decodedToken.id)
      return decodedToken.id; // Replace 'customer_id' with the correct key in your token
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };

  // Fetch cart items when the component mounts
  useEffect(() => {
    const customer_id = getCustomerIdFromToken(); // Get customer_id from the JWT token
    if (customer_id) {
      dispatch(fetchCart(customer_id)); // Dispatch action to fetch cart items
    }
  }, [dispatch]);

  const handleNavigate = () => {
    navigate(`/products/${product.product_id}`); // Navigate to the specific product page using the product ID
  };

  // Function to safely format price with commas
  const formatPrice = (price) => {
    if (!price) return 'N/A'; // Fallback in case price is null or undefined
    return Number(price).toLocaleString('en-KE');
  };

  // Handle Add to Cart
  const handleAddToCart = () => {
    const customer_id = getCustomerIdFromToken(); // Get customer_id from the JWT token

    if (!customer_id) {
      console.error('Customer ID not found. User may not be logged in.');
      return;
    }
    console.log("Current Cart Items:", cartItems);
    const existingItem = cartItems?.find(item => item.product_id === product.product_id); // Check if the item already exists

    if (existingItem) {
      // If the item exists, update the quantity
      const updatedItemData = {
        cart_item_id: existingItem.id, // Get the cart_item_id from the existing item
        quantity: existingItem.quantity + 1, // Increase quantity by 1
      };

      // Dispatch the update quantity action
      dispatch(updateCartItem(updatedItemData));
    } else {
      // If the item does not exist, add it to the cart
      const itemData = {
        product_id: product.product_id,
        product_name: product.product_name,
        product_price: product.product_price,
        quantity: 1, // Default quantity, you can customize this
      };

      dispatch(addItemToCart({ customer_id, itemData })); // Pass the customer_id and itemData
    }
  };

  return (
    <div className='min-w-48 mx-5 rounded max-w-64 bg-white text-left shadow-md h-[270px] border cursor-pointer'>
      {/* Navigate on product image click */}
      <img
        src={product.product_images ? JSON.parse(product.product_images)[0] : Logo}
        alt={product.product_name}
        className='max-h-40 min-h-40 w-full object-cover'
        onClick={handleNavigate}
      />
      <h2 className='p-1 font-medium whitespace-nowrap overflow-hidden text-ellipsis'>{product.product_name}</h2>
      <h1 className='font-black p-1 text-xl'>Kes {formatPrice(product.product_price)} /=</h1>

      {/* Add to Cart button */}
      <button
        className='text-white w-full bg-teal-600 p-2 rounded'
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
