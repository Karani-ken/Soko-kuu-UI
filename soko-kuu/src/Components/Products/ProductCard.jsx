import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector to access the Redux state
import { addItemToCart, updateCartItem, fetchCart } from '../../Redux/cartSlice'; // Import your Redux actions
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/soko-kuu.png';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode
import { FiShare2 } from 'react-icons/fi'; // Import the share icon
import { FaHeart } from 'react-icons/fa'; // Import wishlist icon

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

  // Determine stock status and colors
  const renderStockStatus = () => {
    if (product.quantity < 1) {
      return <p className='text-red-500 font-semibold'>Out of Stock</p>;
    } else if (product.quantity > 0 && product.quantity <= 10) {
      return <p className='text-orange-500 font-semibold'>Few Units Left</p>;
    } else {
      return <p className='text-green-500 font-semibold'>In Stock</p>;
    }
  };

  const isPriceAvailable = product.product_price > 1; // Check if price is greater than 1

  // Handle sharing the product link
  const handleShare = () => {
    const productUrl = `${window.location.origin}/products/${product.product_id}`; // Generate the product page URL

    if (navigator.share) {
      navigator.share({
        title: product.product_name,
        text: `Check out this product: ${product.product_name}`,
        url: productUrl,
      })
        .then(() => console.log('Product shared successfully!'))
        .catch((error) => console.error('Error sharing product:', error));
    } else {
      // Fallback: Copy URL to clipboard
      navigator.clipboard.writeText(productUrl).then(() => {
        alert('Product link copied to clipboard');
      }).catch((error) => {
        console.error('Failed to copy the link:', error);
      });
    }
  };

  return (
    <div className='rounded w-48 sm:w-48 md:w-42 lg:w-56 bg-white text-left p-1 shadow-md h-[300px] border cursor-pointer relative'>
      {/* Watermark overlay */}
      {!isPriceAvailable && (
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 text-white text-lg font-bold z-10'>
          Not Available
        </div>
      )}
      {/* Navigate on product image click */}
      <img
        src={product.product_images ? JSON.parse(product.product_images)[0] : Logo} // Show product image or fallback to logo
        alt={product.product_name}
        className='max-h-40 min-h-40 w-full object-contain'
        onClick={handleNavigate} // Always allow navigation on image click
      />
      <h2 className='p-1 font-medium whitespace-nowrap overflow-hidden text-ellipsis'>{product.product_name}</h2>
      <h1 className='font-black p-1 text-xl'>
        {isPriceAvailable ? `Kes ${formatPrice(product.product_price)} ` : 'N/A'}
      </h1>

      {/* Stock status */}
      {renderStockStatus()}

      {/* Add to Cart button */}
      <button
        className={`text-white w-full p-2 rounded ${isPriceAvailable ? 'bg-teal-600' : 'bg-gray-400'}`}
        onClick={isPriceAvailable ? handleAddToCart : undefined} // Only allow add to cart if available
        disabled={!isPriceAvailable} // Disable button if not available
      >
        {isPriceAvailable ? 'Add to cart' : 'Unavailable'}
      </button>

      {/* Share and Wishlist Icons */}
      <div className='absolute top-2 right-2 flex space-x-2'>
        <button className='text-teal-600' onClick={handleShare}>
          <FiShare2 size={20} />
        </button>
        <button className='text-red-500'>
          <FaHeart size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
