import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../Products/ProductCard';

const Search = () => {
  const { searchTerm } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Fetch data from the products endpoint
  const fetchData = async () => {
    try {
      const productsResponse = await axios.get('https://api.kelynemedia.co.ke/products/all');
      setProducts(productsResponse.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter results whenever the search term, minPrice, maxPrice, or products change
  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearchTerm = product?.product_name.toLowerCase().includes(searchTerm.toLowerCase());
      const price = Number(product.product_price); // Assuming product_price is a number
      const matchesMinPrice = !minPrice || price >= Number(minPrice);
      const matchesMaxPrice = !maxPrice || price <= Number(maxPrice);
      return matchesSearchTerm && matchesMinPrice && matchesMaxPrice;
    });

    setFilteredProducts(filtered);
  }, [searchTerm, minPrice, maxPrice, products]);

  return (
    <div className="p-4 min-h-screen">
      {/* Price Filter */}
      <div className="mb-4">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="px-4 py-2 border rounded w-28 md:w-32 mr-2"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="px-4 py-2 border rounded w-28 md:w-32"
        />
      </div>

      {/* Search Results */}
      <div>
        {searchTerm && (
          <>           
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:grid-cols-5">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => <ProductCard key={product.product_id} product={product} />)
              ) : (
                <p>No matching products found.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
