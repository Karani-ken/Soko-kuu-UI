import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const AllProducts = () => {
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Store original products
  const [loading, setLoading] = useState(true);

  // Function to fetch products from the backend API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://api.kelynemedia.co.ke/products/all'); // Replace with your actual API endpoint
      setProducts(response.data); // Set initial products for display
      setAllProducts(response.data); // Store all products for filtering
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to sort products alphabetically A-Z or Z-A
  const handleSortOrder = (order) => {
    const sortedProducts = [...products].sort((a, b) => {
      const nameA = a.product_name.toLowerCase();
      const nameB = b.product_name.toLowerCase();
      if (order === 'A-Z') {
        return nameA.localeCompare(nameB);
      } else if (order === 'Z-A') {
        return nameB.localeCompare(nameA);
      }
      return 0;
    });
    setSortOrder(order);
    setProducts(sortedProducts);
  };

  // Function to filter products by price range
  const handlePriceFilter = () => {
    const filteredProducts = allProducts.filter((product) => {
      const price = Number(product.product_price); // Assuming product_price is a number
      const isAboveMin = !minPrice || price >= Number(minPrice);
      const isBelowMax = !maxPrice || price <= Number(maxPrice);
      return isAboveMin && isBelowMax;
    });
    setProducts(filteredProducts);
  };

  return (
    <div className='min-h-screen my-5'>
      <h1 className='text-center font-bold'> All Products</h1>
      {/* Navigation Bar */}
      <div className="flex flex-col md:flex-row justify-between border py-2 shadow-md items-center mb-5 px-4 md:px-1">
        {/* Sort Options */}
        <div className="flex space-x-2 md:space-x-4 mb-3 md:mb-0">
          <button
            className={`px-3 py-2 border rounded ${sortOrder === 'A-Z' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
            onClick={() => handleSortOrder('A-Z')}
          >
            A-Z
          </button>
          <button
            className={`px-3 py-2 border rounded ${sortOrder === 'Z-A' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
            onClick={() => handleSortOrder('Z-A')}
          >
            Z-A
          </button>
        </div>

        {/* Price Filter */}
        <div className="flex space-x-2 md:space-x-4">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="px-4 py-2 border rounded w-28 md:w-32"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="px-4 py-2 border rounded w-28 md:w-32"
          />
          <button
            onClick={handlePriceFilter}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="text-center">Loading products...</div>
      ) : (
        // Product Grid
        <div className="grid grid-cols-2 sm:grid-cols-2 bg-slate-100 p-2 rounded-md md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-4 px-4 md:px-0">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))
          ) : (
            <div className="text-center col-span-full">No products found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
