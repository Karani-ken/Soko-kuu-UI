import React, { useState } from 'react';
import ProductCard from './ProductCard';

const AllProducts = () => {
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [products, setProducts] = useState([
    // Dummy products for demo purposes. Replace this with actual data.
    { id: 1, name: 'Product A', price: 50 },
    { id: 2, name: 'Product B', price: 100 },
    { id: 3, name: 'Product C', price: 25 },
    { id: 4, name: 'Product D', price: 75 },
    { id: 5, name: 'Product E', price: 30 },
    { id: 6, name: 'Product F', price: 60 },
  ]);

  // Function to sort products alphabetically A-Z or Z-A
  const handleSortOrder = (order) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (order === 'A-Z') {
        return a.name.localeCompare(b.name);
      } else if (order === 'Z-A') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
    setSortOrder(order);
    setProducts(sortedProducts);
  };

  // Function to filter products by price range
  const handlePriceFilter = () => {
    const filteredProducts = products.filter((product) => {
      return (
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice)
      );
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

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6 px-4 md:px-0">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
