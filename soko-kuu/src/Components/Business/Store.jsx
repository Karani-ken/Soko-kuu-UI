import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Logo from '../../assets/soko-kuu.png';
import { LuBadgeCheck } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import ProductCard from '../Products/ProductCard';
import axios from 'axios';
import { FaLocationDot, FaWhatsapp } from "react-icons/fa6";

const Store = () => {
    const { id } = useParams(); // Extract the business ID from the URL
    const [businessDetails, setBusinessDetails] = useState(null);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    // Fetch business details and products when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch business details
                const businessResponse = await axios.get(`https://api.kelynemedia.co.ke/auth/user/${id}`);
                setBusinessDetails(businessResponse.data[0]);

                // Fetch products for this business
                const productsResponse = await axios.get(`https://api.kelynemedia.co.ke/products/products/${id}`);
                setProducts(productsResponse.data);
                setFilteredProducts(productsResponse.data); // Initialize filtered products
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // End loading state when data fetch is complete
            }
        };

        fetchData();
    }, [id]);

    const formattedPhoneNumber = (phone) => {
        // Check if the phone number starts with '0'
        if (phone.startsWith('0')) {
            // Remove the leading '0' and return the rest of the number
            return phone.slice(1);
        }
        // If it doesn't start with '0', return the number as it is
        return phone;
    };

    // Handle search functionality
    const handleSearch = () => {
        if (searchQuery) {
            const filtered = products.filter(product =>
                product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            // If search query is empty, reset to all products
            setFilteredProducts(products);
        }
    };

    const getBadgeColor = (subscriptionType) => {
        switch (subscriptionType) {
            case 'bronze':
                return 'text-red-700'; // Define your CSS class for Bronze
            case 'silver':
                return 'text-slate-500'; // Define your CSS class for Silver
            case 'gold':
                return 'text-yellow-500'; // Define your CSS class for Gold
            default:
                return ''; // No badge for Basic
        }
    };

    // Render blank placeholder product cards while loading
    const renderPlaceholderProducts = () => {
        const placeholders = Array(6).fill(null); // Create 6 blank placeholders
        return placeholders.map((_, index) => (
            <div key={index} className='min-w-48 mx-5 rounded max-w-64 bg-white text-left shadow-sm h-56 border'>
                <div className='bg-gray-200 w-full h-40 animate-pulse'></div>
                <div className='bg-gray-300 h-4 w-3/4 mt-2 mx-2 rounded animate-pulse'></div>
                <div className='bg-gray-300 h-6 w-1/2 mt-2 mx-2 rounded animate-pulse'></div>
            </div>
        ));
    };

    return (
        <div className='min-h-screen mt-4'>
            {/* Business Information Section */}
            <div className='bg-black text-white p-1 md:p-0 md:min-h-40 gap-2 rounded grid grid-cols-1 md:grid-cols-3'>
                <div className='flex justify-center align-middle p-3'>
                    <img src={businessDetails?.profile_pic || Logo} alt="Business Logo" className='w-32 h-32' />
                </div>
                <div className='p-2'>
                    <h1 className='font-bold text-sm flex'>
                        {businessDetails ? businessDetails.name : "Loading..."}
                        {businessDetails && businessDetails.subscription_type !== 'basic' && (
                            <LuBadgeCheck className={`m-1.5 text-xl ${getBadgeColor(businessDetails.subscription)}`} />
                        )}
                    </h1>
                    <p>{businessDetails ? businessDetails.address : "Loading location..."}</p>
                    <p>{businessDetails ? businessDetails.city : "Loading location..."}</p>
                    <p>{businessDetails ? businessDetails.county : "Loading location..."}</p>
                    <button className='p-2 bg-blue-900 mt-4 flex justify-center items-center rounded'> <FaLocationDot className='mx-1 text-red-500' />  See Location</button>
                </div>
                <div>
                    <p className='text-sm md:p-0 p-1'>
                        {businessDetails ? businessDetails.description : "Loading description..."}
                    </p>
                    <h2 className='font-medium mt-2'>
                        {businessDetails ? businessDetails.category : "Loading category..."}
                    </h2>
                    <h2 className='font-medium mt-2'>
                        {businessDetails ? businessDetails.phone : "Loading category..."}
                    </h2>
                    <button
                        className='bg-blue-500 mt-2 p-2 rounded flex  text-xl justify-center items-center'
                        onClick={() => window.open(`https://wa.me/+254${formattedPhoneNumber(businessDetails.phone)}?text=Hello, I found your Business on Soko-kuu. I would like to inquire about your products.`, '_blank')}
                    >
                        <FaWhatsapp className='mx-2 text-green-900' />  message
                    </button>
                </div>
            </div>

            {/* Product Search and Count Section */}
            <div className='bg-blue-400 mt-4 p-5 rounded md:flex justify-between'>
                <h1 className='text-white text-xl font-bold'>Products: {loading ? "Loading..." : filteredProducts.length}</h1>
                <div className='bg-white p-1 rounded-md flex'>
                    <input
                        type="text"
                        placeholder='Search from store'
                        className='rounded p-1 border'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                    />
                    <button
                        className='bg-blue-900 p-2 mx-2 text-white rounded'
                        onClick={handleSearch} // Trigger search on button click
                    >
                        <FaSearch />
                    </button>
                </div>
            </div>

            {/* Products Section */}
            <div className='bg-slate-100 mt-4 rounded p-3 mb-4'>
                <h1 className='text-center font-bold'>All Products</h1>
                <div className='md:p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-x-auto'>
                    {loading ? renderPlaceholderProducts() : (
                        filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <ProductCard key={product.product_id} product={product} />
                            ))
                        ) : (
                            <div className='col-span-full text-center text-gray-500'>No products found.</div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Store;
