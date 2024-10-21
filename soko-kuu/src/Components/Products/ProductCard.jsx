import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, updateCartItem, fetchCart } from '../../Redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/soko-kuu.png';
import { jwtDecode } from 'jwt-decode';
import { FiShare2 } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const getCustomerIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };

  useEffect(() => {
    const customer_id = getCustomerIdFromToken();
    if (customer_id) {
      dispatch(fetchCart(customer_id));
    }
  }, [dispatch]);

  const handleNavigate = () => {
    navigate(`/products/${product.product_id}`);
  };

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    return Number(price).toLocaleString('en-KE');
  };

  const handleAddToCart = () => {
    const customer_id = getCustomerIdFromToken();

    if (!customer_id) {
      // Redirect to login page if not logged in
      navigate('/signin');
      return;
    }

    const existingItem = cartItems?.find(item => item.product_id === product.product_id);

    if (existingItem) {
      const updatedItemData = {
        cart_item_id: existingItem.id,
        quantity: existingItem.quantity + 1,
      };

      dispatch(updateCartItem(updatedItemData));
    } else {
      const itemData = {
        product_id: product.product_id,
        product_name: product.product_name,
        product_price: product.product_price,
        quantity: 1,
      };

      dispatch(addItemToCart({ customer_id, itemData }));
    }
  };

  const renderStockStatus = () => {
    if (product.quantity < 1) {
      return <p className='text-red-500 font-semibold'>Out of Stock</p>;
    } else if (product.quantity > 0 && product.quantity <= 10) {
      return <p className='text-orange-500 font-semibold'>Few Units Left</p>;
    } else {
      return <p className='text-green-500 font-semibold'>In Stock</p>;
    }
  };

  const isPriceAvailable = product.product_price > 1;

  const handleShare = () => {
    const productUrl = `${window.location.origin}/products/${product.product_id}`;

    if (navigator.share) {
      navigator.share({
        title: product.product_name,
        text: `Check out this product: ${product.product_name}`,
        url: productUrl,
      })
        .then(() => console.log('Product shared successfully!'))
        .catch((error) => console.error('Error sharing product:', error));
    } else {
      navigator.clipboard.writeText(productUrl).then(() => {
        alert('Product link copied to clipboard');
      }).catch((error) => {
        console.error('Failed to copy the link:', error);
      });
    }
  };

  return (
    <div className='rounded w-48 sm:w-48 md:w-42 lg:w-56 bg-white text-left p-1 shadow-md h-[300px] border cursor-pointer relative'>
      {!isPriceAvailable && (
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 text-white text-lg font-bold z-10'>
          Not Available
        </div>
      )}
      <img
        src={product.product_images ? JSON.parse(product.product_images)[0] : Logo}
        alt={product.product_name}
        className='max-h-40 min-h-40 w-full object-contain'
        onClick={handleNavigate}
      />
      <h2 className='p-1 font-medium whitespace-nowrap overflow-hidden text-ellipsis'>{product.product_name}</h2>
      <h1 className='font-black p-1 text-xl'>
        {isPriceAvailable ? `Kes ${formatPrice(product.product_price)} ` : 'N/A'}
      </h1>

      {renderStockStatus()}

      <button
        className={`text-white w-full p-2 rounded ${isPriceAvailable ? 'bg-teal-600' : 'bg-gray-400'}`}
        onClick={isPriceAvailable ? handleAddToCart : undefined}
        disabled={!isPriceAvailable}
      >
        {isPriceAvailable ? 'Add to cart' : 'Unavailable'}
      </button>

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
