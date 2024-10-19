import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from '../../assets/furniture.jpeg';
import ProductCard from './ProductCard';
import { useParams, useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaShareAlt, FaHeart, FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import wishlist and share icons
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { addItemToCart, updateCartItem } from '../../Redux/cartSlice'; // Import your Redux actions
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode

const ProductPage = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null); // State to store product data
  const [relatedProducts, setRelatedProducts] = useState([]); // State to store related products
  const [loading, setLoading] = useState(true); // State for loading
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for current image index
  const [expanded, setExpanded] = useState(false); // State for description expansion
  const [showMore, setShowMore] = useState(false); // State to track if more related products should be shown

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the current cart items from Redux state
  const cartItems = useSelector((state) => state.cart.items);

  // Function to decode JWT and get customer_id
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

  // Fetch the product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://api.kelynemedia.co.ke/products/product/${id}`);
        setProduct(response.data);

        // Fetch related products from the same category
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

  // Image rotation logic
  useEffect(() => {
    if (product && product.product_images) {
      const images = JSON.parse(product.product_images);

      const imageRotation = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 5000);

      return () => clearInterval(imageRotation);
    }
  }, [product]);

  // Placeholder function for getting the current product image
  const getProductImage = () => {
    try {
      const images = JSON.parse(product.product_images);
      return images.length > 0 ? images[currentImageIndex] : Image;
    } catch (error) {
      return Image;
    }
  };

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    const customer_id = getCustomerIdFromToken();
    if (!customer_id) {
      console.error('Customer ID not found. User may not be logged in.');
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

  // Function to handle sharing the product
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

  // Function to change to the next image
  const handleNextImage = () => {
    if (product && product.product_images) {
      const images = JSON.parse(product.product_images);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  // Function to change to the previous image
  const handlePreviousImage = () => {
    if (product && product.product_images) {
      const images = JSON.parse(product.product_images);
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

  // Render stock status
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
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-xl font-bold">Loading...</p>
        </div>
      ) : (
        <>
          {/* Product details and images */}
          <div className='bg-slate-200 grid mb-32 md:mb-4 h-screen lg:h-[50vh] grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 shadow rounded-md'>
            {/* Product Images Section */}
            <div className='w-full p-2 overflow-hidden'>
              <div className='relative'>
                <img src={getProductImage()} alt={`Product`} className='w-full object-contain rounded-md h-72' />
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
            <div className=' p-2 bg-white border'>
              <h1 className='text-center text-xl font-bold text-black'>{product ? product.product_name : 'Product Name'}</h1>

              {/* Description Section */}
              <div className='mt-5'>
                <p
                  className={`text-black bg-white transition-all duration-300 rounded p-1 ${expanded ? 'overflow-y-auto' : 'overflow-y-hidden'}  ${expanded ? 'max-h-[150px]' : 'max-h-[100px]'}`}
                >
                  {product ? product.product_description : 'Product description goes here...'}
                </p>
                {product && product.product_description.length > 200 && (
                  <button
                    className='text-teal-600 underline mt-2'
                    onClick={() => setExpanded(!expanded)}
                  >
                    {expanded ? 'View Less' : 'View More'}
                  </button>
                )}
              </div>

              <h2 className='my-3 text-teal-800 font-semibold'>{product ? product.category : 'Category'}</h2>

              {/* Price */}
              <h1 className='font-bold text-2xl text-blue-900 mt-3'>
                {product && product.product_price > 1 ? (
                  <>
                    <sup>Kes</sup> {Number(product.product_price).toLocaleString('en-KE')}
                  </>
                ) : (
                  <span className='text-red-600'>Not Available</span>
                )}
              </h1>

              {/* Stock Status */}
              <div className='my-2'>
                {product && renderStockStatus(product.product_quantity)}
              </div>

              {/* Add to Cart button */}
              {product && product.product_price <= 1 ? (
                <button className='bg-gray-400 text-white font-bold p-2 mx-2 rounded-md cursor-not-allowed' disabled>
                  Not Available
                </button>
              ) : (
                <button
                  className='bg-teal-500 text-white p-2 rounded-md hover:bg-teal-600 w-full'
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              )}

              {/* Share and Wishlist buttons */}
              <div className='flex justify-around mt-5'>
                <button onClick={handleShare} className='bg-slate-600 text-white p-2 rounded-md'>
                  <FaShareAlt className='inline-block mr-2' /> Share
                </button>
                <button className='bg-pink-600 text-white p-2 rounded-md'>
                  <FaHeart className='inline-block mr-2' /> Wishlist
                </button>
              </div>

             
          
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts && relatedProducts.length > 0 && (
            <div className='bg-gray-100 w-full py-2 mt-5'>
              <h2 className='text-lg font-bold mb-4 text-center'>Recommended Products</h2>
              <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5'>
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
    </div>
  );
};

export default ProductPage;
