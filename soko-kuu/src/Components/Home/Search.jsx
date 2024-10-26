import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../Products/ProductCard';

const Search = () => {
  const { searchTerm } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch data from the products endpoint
  const fetchData = async () => {
    setLoading(true);
    try {
      const productsResponse = await axios.get('https://api.kelynemedia.co.ke/products/all');
      setProducts(productsResponse.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Debounce effect for search term to reduce excessive re-renders
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = products.filter(product => {
        const matchesSearchTerm = 
          product?.product_name.toLowerCase().includes(lowerCaseSearchTerm) ||
          product?.product_description.toLowerCase().includes(lowerCaseSearchTerm) ||
          product?.category.toLowerCase().includes(lowerCaseSearchTerm);

        const price = Number(product.product_price); // Assuming product_price is a number
        const matchesMinPrice = !minPrice || price >= Number(minPrice);
        const matchesMaxPrice = !maxPrice || price <= Number(maxPrice);

        return matchesSearchTerm && matchesMinPrice && matchesMaxPrice;
      });

      setFilteredProducts(filtered);

      // Set product suggestions based on the current search term
      setSuggestions(
        filtered.slice(0, 5) // Limit to top 5 suggestions for simplicity
      );
    }, 300); // Adjust the delay as needed for debouncing

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, minPrice, maxPrice, products]);

  const handleSuggestionClick = (productName) => {
    navigate(`/search/${productName}`);
  };

  return (
    <div className="p-4 min-h-screen">
      {/* Price Filter */}
      <div className="mb-4 flex flex-col md:flex-row">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="px-4 py-2 border rounded w-28 md:w-32 mr-2 mb-2 md:mb-0"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="px-4 py-2 border rounded w-28 md:w-32"
        />
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center my-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="ml-3">Loading products...</p>
        </div>
      ) : (
        <>
          {/* Suggestion Box */}
          {suggestions.length > 0 && (
            <div className="bg-white shadow-md rounded border mt-2 p-2">
              <p className="font-semibold text-gray-700 mb-2">Suggestions:</p>
              <ul>
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.product_id}
                    className="py-1 cursor-pointer text-blue-500 hover:underline"
                    onClick={() => handleSuggestionClick(suggestion.product_name)}
                  >
                    {suggestion.product_name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Search Results */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:grid-cols-5 mt-5">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => <ProductCard key={product.product_id} product={product} />)
            ) : (
              <p>No matching products found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
