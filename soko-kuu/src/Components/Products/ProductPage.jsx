import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from '../../assets/furniture.jpeg';
import ProductCard from './ProductCard';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShareAlt, FaHeart, FaChevronDown, FaChevronUp, FaTruck, FaUndo, FaStar } from 'react-icons/fa'; // Import necessary icons
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, updateCartItem } from '../../Redux/cartSlice';
import { jwtDecode } from 'jwt-decode';
import AgeConfirmationModal from './AgeConfirmationModal';
import { toast, ToastContainer } from 'react-toastify';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('delivery'); // State for active tab
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false); // Loading state for add to cart

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://api.kelynemedia.co.ke/products/product/${id}`);
        setProduct(response.data);
        const relatedResponse = await axios.get(`https://api.kelynemedia.co.ke/products/category/${response.data.category}`);
        setRelatedProducts(relatedResponse.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && product.product_images) {
      const images = JSON.parse(product.product_images);
      const imageRotation = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 5000);
      return () => clearInterval(imageRotation);
    }
  }, [product]);

  const getProductImage = () => {
    try {
      const images = JSON.parse(product.product_images);
      return images.length > 0 ? images[currentImageIndex] : Image;
    } catch (error) {
      return Image;
    }
  };

  const handleIncreaseQuantity = () => {
    if (itemQuantity < product.quantity) {
      setItemQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (itemQuantity > 1) {
      setItemQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true); // Start loading
    const customer_id = getCustomerIdFromToken();
    if (!customer_id) {
      toast.error('Please log in to add items to your cart.'); // Notify the user
      navigate('/signin'); // Redirect to login page
      setIsAddingToCart(false); // Stop loading
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
        quantity: itemQuantity,
      };
      await dispatch(addItemToCart({ customer_id, itemData }));
    }
    toast.success('Item added to cart successfully!'); // Notify on success
    setIsAddingToCart(false); // Stop loading
  };

  const handleAddToCartWithConfirmation = () => {
    if (product.category === 'LIQOUR') {
      setIsModalOpen(true);
    } else {
      handleAddToCart();
    }
  };

  const confirmAge = () => {
    handleAddToCart();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.product_name,
        url: window.location.href,
      })
        .then(() => console.log('Share successful'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert(`Share this product: ${window.location.href}`);
    }
  };

  const handleNextImage = () => {
    if (product && product.product_images) {
      const images = JSON.parse(product.product_images);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const handlePreviousImage = () => {
    if (product && product.product_images) {
      const images = JSON.parse(product.product_images);
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

  const renderStockStatus = (quantity) => {
    if (quantity < 1) {
      return <span className="text-red-600 font-bold">Out of Stock</span>;
    } else if (quantity < 10) {
      return <span className="text-orange-600 font-bold">Few Units Left</span>;
    } else {
      return <span className="text-green-600 font-bold">In Stock</span>;
    }
  };

  return (
    <div className='min-h-screen mt-5'>
      <ToastContainer />
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-xl font-bold">Loading...</p>
        </div>
      ) : (
        <>
          {/* Product details and images */}
          <div className='bg-blue-300 grid mb-5 md:mb-4 h-screen lg:h-[55vh] grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 shadow rounded-lg'>
            {/* Product Images Section */}
            <div className='w-full p-2 overflow-hidden'>
              <div className='relative'>
                <img src={getProductImage()} alt={`Product`} className='w-full object-contain rounded-md h-80' />
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <button className='bg-teal-600 text-white p-2' onClick={handlePreviousImage}>
                    <FaChevronUp />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button className='bg-teal-600 text-white p-2' onClick={handleNextImage}>
                    <FaChevronDown />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className='p-2 bg-white border rounded-lg'>
              <h1 className='text-center text-xl font-bold text-black'>{product ? product.product_name : 'Product Name'}</h1>

              {/* Description Section */}
              <div className='mt-2'>
                <p
                  className={`text-black bg-white transition-all duration-300 rounded p-1 ${expanded ? 'overflow-y-auto' : 'overflow-y-hidden'}  ${expanded ? 'max-h-[150px]' : 'max-h-[100px]'}`}
                >
                  {product ? product.product_description : 'Product description goes here...'}
                </p>
                {product && product.product_description.length > 100 && (
                  <button
                    className='text-teal-600 underline mt-1'
                    onClick={() => setExpanded(!expanded)}
                  >
                    {expanded ? 'View Less' : 'View More'}
                  </button>
                )}
              </div>

              <h2 className='my-3 text-teal-800 font-semibold'>{product ? product.category : 'Category'}</h2>

              <div className='flex justify-between mb-2'>
                <h1 className='font-bold text-2xl text-blue-900 mt-1'>
                  {product && product.product_price > 1 ? (
                    <>
                      Price: <sup>Kes</sup> {Number(product.product_price).toLocaleString('en-KE')}
                    </>
                  ) : (
                    <span className='text-red-600'>Not Available</span>
                  )}
                </h1>
                <p className='font-bold'>Total Price: <sup>Kes</sup> {Number(product.product_price * itemQuantity).toLocaleString('en-KE')} </p>
                {/* Stock Status */}
                <div className='my-1'>
                  {product && renderStockStatus(product.product_quantity)}
                </div>
              </div>

              {/* Add to Cart button */}
              <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
                <div className='flex justify-around  p-1 rounded bg-slate-300'>
                  <button className='p-1 bg-red-600 rounded-md text-white font-bold' onClick={handleDecreaseQuantity}>-</button>
                  <p className='p-1'>{itemQuantity}</p>
                  <button className='p-1 bg-teal-600 rounded-md text-white font-bold' onClick={handleIncreaseQuantity}>+</button>
                </div>
                {product && product.product_price <= 1 ? (
                  <button className='bg-gray-400 text-white font-bold p-2 mx-2 rounded-md cursor-not-allowed' disabled>
                    Not Available
                  </button>
                ) : (
                  <button
                    className='bg-teal-500 text-white p-2 rounded-md hover:bg-teal-600'
                    onClick={handleAddToCartWithConfirmation}
                    disabled={isAddingToCart} // Disable button while adding to cart
                  >
                    {isAddingToCart ? 'Adding...' : 'Add to Cart'} {/* Show loading state */}
                  </button>
                )}

                <button onClick={handleShare} className='bg-slate-600 text-white p-2 rounded-md'>
                  <FaShareAlt className='inline-block mx-2' /> Share
                </button>
                <button className='bg-pink-600 text-white p-2 mx-2 rounded-md'>
                  <FaHeart className='inline-block ' /> Wishlist
                </button>
              </div>
            </div>
          </div>

          {/* Tab Section */}
          <div className="mb-5">
            <div className="flex justify-around border-b">
              <button
                className={`p-2 ${activeTab === 'delivery' ? 'border-b-2 border-teal-600' : ''}`}
                onClick={() => setActiveTab('delivery')}
              >
                Delivery
              </button>
              <button
                className={`p-2 ${activeTab === 'return' ? 'border-b-2 border-teal-600' : ''}`}
                onClick={() => setActiveTab('return')}
              >
                Return
              </button>
              <button
                className={`p-2 ${activeTab === 'reviews' ? 'border-b-2 border-teal-600' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'delivery' && (
              <div className='bg-gray-100 p-4 rounded-md shadow mb-5'>
                <h2 className='text-lg font-bold mb-2'><FaTruck className='inline-block mr-2' /> Delivery Policy</h2>
                <p className='text-gray-700'>
                  Delivery fees depends on the locations.
                </p>
              </div>
            )}
            {activeTab === 'return' && (
              <div className='bg-gray-100 p-4 rounded-md shadow mb-5'>
                <h2 className='text-lg font-bold mb-2'><FaUndo className='inline-block mr-2' /> Return Policy</h2>
                <p className='text-gray-700'>
                  If you are not satisfied with your purchase, you may return it within 2 days for a full refund. The item must be in its original condition and packaging. Please retain your receipt as proof of purchase.
                  <b className='text-red-700'> NB: food stuffs, drinks and perishable goods are not returnable!!</b>
                </p>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className='bg-gray-100 p-4 rounded-md shadow mb-5'>
                <h2 className='text-lg font-bold mb-2'>Reviews</h2>
                {/* Sample Reviews */}
                <div className='flex items-start mb-3'>
                  <FaStar className='text-yellow-500 mr-1' />
                  <FaStar className='text-yellow-500 mr-1' />
                  <FaStar className='text-yellow-500 mr-1' />
                  <FaStar className='text-yellow-500 mr-1' />
                  <FaStar className='text-gray-400 mr-1' />
                  <p className='ml-2'>“Excellent product! Highly recommend.” - Jimmy005</p>
                </div>
                <div className='flex items-start mb-3'>
                  <FaStar className='text-yellow-500 mr-1' />
                  <FaStar className='text-yellow-500 mr-1' />
                  <FaStar className='text-yellow-500 mr-1' />
                  <FaStar className='text-yellow-500 mr-1' />
                  <FaStar className='text-yellow-500 mr-1' />
                  <p className='ml-2'>“Great quality and fast shipping.” - AnnitaK</p>
                </div>
              </div>
            )}
          </div>

          {/* Related Products */}
          {relatedProducts && relatedProducts.length > 0 && (
            <div className='bg-gray-100 w-full py-2 mt-5'>
              <h2 className='text-lg font-bold mb-4 text-center'>Recommended Products</h2>
              <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1 lg:gap-5'>
                {relatedProducts.slice(0, showMore ? relatedProducts.length : 10).map((relatedProduct) => (
                  <div key={relatedProduct.product_id} className='w-full md:w-1/4 p-2'>
                    <ProductCard product={relatedProduct} />
                  </div>
                ))}
              </div>

              {/* Show More/Show Less Button */}
              {relatedProducts.length > 10 && (
                <div className='flex justify-center mt-4'>
                  <button
                    className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? 'Show Less' : 'See More'}
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}

      <AgeConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmAge}
      />
    </div>
  );
};

export default ProductPage;
