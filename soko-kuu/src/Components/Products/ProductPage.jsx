import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from '../../assets/furniture.jpeg';
import ProductCard from './ProductCard';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";

const ProductPage = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null); // State to store product data
  const [relatedProducts, setRelatedProducts] = useState([]); // State to store related products
  const [loading, setLoading] = useState(true); // State for loading
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for current image index
  const navigate = useNavigate()
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
  }, [id]); // Fetch product and related products when component mounts or `id` changes

  // Start image rotation every 10 seconds
  useEffect(() => {
    if (product && product.product_images) {
      const images = JSON.parse(product.product_images);

      const imageRotation = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 10000); // Change image every 10 seconds

      return () => clearInterval(imageRotation); // Cleanup interval on component unmount
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

  const formattedPhoneNumber = (phone) => {
    // Check if the phone number starts with '0'
    if (phone.startsWith('0')) {
      // Remove the leading '0' and return the rest of the number
      return phone.slice(1);
    }
    // If it doesn't start with '0', return the number as it is
    return phone;
  };

  const navigateToStore = (id) => {
      navigate(`/store/${id}`)
  }
  return (
    <div className='min-h-screen mt-5'>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl font-bold">Loading...</p> {/* Adjust loading style as needed */}
        </div>
      ) : (
        <>
          <div className='bg-slate-200 grid h-[70vh] grid-cols-1 md:grid-cols-2 shadow rounded-md'>
            {/* Product Images Section */}
            <div className='w-full p-2 h-80'>
              <img src={product ? getProductImage() : Image} alt={product ? product.product_name : 'Product'} className='w-full rounded-md h-72' />
              <div className='flex justify-center gap-4 w-full my-2'>
                {product && JSON.parse(product.product_images).map((img, index) => (
                  <img key={index} src={img} alt={`Product ${index}`} className='w-32 h-24' />
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className='bg-blue-400 p-2'>
              <h1 className='text-center text-xl font-bold text-white'>{product ? product.product_name : 'Product Name'}</h1>
              <p className='text-white mt-5'>{product ? product.product_description : 'Product description goes here...'}</p>
              <h2 className='my-3 text-teal-800 font-semibold'>{product ? product.category : 'Category'}</h2>
              <h1 className='font-bold text-2xl text-blue-900 mt-3'>
                <sup>Kes</sup> {product ? product.product_price : 'Price'} /=
              </h1>

              <button
                className='bg-teal-900 flex text-xl justify-around items-center mt-2 p-2 text-white rounded'
                onClick={() => {
                  const currentUrl = window.location.href; // Get the current URL
                  const message = `Hello, I found this product on Soko-kuu. I'd love to inquire about it: ${currentUrl}`;
                  window.open(`https://wa.me/+254${formattedPhoneNumber(product.user_contact)}?text=${encodeURIComponent(message)}`, '_blank');
                }}
              >
                message <FaWhatsapp className='mx-2' />
              </button>
              <br />
              <button className='p-2 text-white bg-slate-900 mt-2 rounded-md' onClick={() => navigateToStore(product.user_id)}>Visit Store</button>
            </div>
          </div>

          {/* Similar Products Section */}
          <div className='bg-white mb-4'>
            <h1 className='text-center font-bold my-2'>Similar Products</h1>
            <div className='flex justify-end my-1'>
              <Link to='/all-products'><button className='p-1 bg-blue-400 text-white rounded mx-2'>See all</button></Link>
            </div>
            <div className='flex w-full bg-slate-200 justify-around overflow-x-auto py-2 rounded-md'>
              {relatedProducts.length > 0 ? (
                relatedProducts.map(relatedProduct => (
                  <ProductCard key={relatedProduct.product_id} product={relatedProduct} />
                ))
              ) : (
                <p className='text-center text-gray-500'>No related products found</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
