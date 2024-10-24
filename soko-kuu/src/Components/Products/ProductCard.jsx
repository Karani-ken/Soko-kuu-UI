import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, updateCartItem, fetchCart } from '../../Redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/soko-kuu.png';
import { jwtDecode } from 'jwt-decode';
import { FiShare2 } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify'; // Import toast for notifications
import AgeConfirmationModal from './AgeConfirmationModal'; // Import the modal component

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const cartItems = useSelector((state) => state.cart.items);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

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

  const handleAddToCart = async () => {
    const customer_id = getCustomerIdFromToken();

    if (!customer_id) {
      // Redirect to login page if not logged in
      navigate('/signin');
      return;
    }

    // Show loading toast
    const loadingToastId = toast.loading('Adding to cart...');

    const existingItem = cartItems?.find(item => item.product_id === product.product_id);

    try {
      if (existingItem) {
        const updatedItemData = {
          cart_item_id: existingItem.id,
          quantity: existingItem.quantity + 1,
        };
        await dispatch(updateCartItem(updatedItemData)).unwrap();
      } else {
        const itemData = {
          product_id: product.product_id,
          product_name: product.product_name,
          product_price: product.product_price,
          quantity: 1,
        };
        await dispatch(addItemToCart({ customer_id, itemData })).unwrap();
      }

      // Notify success
      toast.update(loadingToastId, { render: 'Added to cart!', type: 'success', isLoading: false, autoClose: 2000 });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      // Notify failure
      toast.update(loadingToastId, { render: 'Failed to add to cart!', type: 'error', isLoading: false, autoClose: 2000 });
    }
  };

  const handleAddToCartWithConfirmation = () => {
    // Open modal for liquor category
    if (product.category === 'LIQOUR') {
      setIsModalOpen(true);
    } else {
      handleAddToCart(); // Directly add to cart for other categories
    }
  };

  const confirmAge = () => {
    handleAddToCart();
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
    <div className='rounded w-42 sm:w-42 md:w-42 lg:w-56 bg-white text-left p-1 shadow-md h-[300px] border cursor-pointer relative'>
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
        onClick={isPriceAvailable ? handleAddToCartWithConfirmation : undefined}
        disabled={!isPriceAvailable} // Disable if not available
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

      {/* Age Confirmation Modal */}
      <AgeConfirmationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={confirmAge} 
      />
    </div>
  );
};

export default ProductCard;
