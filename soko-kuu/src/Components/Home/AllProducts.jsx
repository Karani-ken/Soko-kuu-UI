import React, { useEffect, useState } from 'react';
import ProductCard from '../Products/ProductCard'; // Import the ProductCard component
import axios from 'axios';

export const AllProducts = () => {
  const [products, setProducts] = useState([]); // State to hold all products
  const [categories, setCategories] = useState({}); // State to hold products organized by category
  const [loading, setLoading] = useState(true); // Loading state
  const [expandedCategories, setExpandedCategories] = useState({}); // State to track expanded categories

  // Array of prioritized categories
  const prioritizedCategories = [    
    'Phones and Accessories',
    'Tech Solutions',
    'Beauty Products',
    'Kitchen Appliances',
    'Home Appliances',
    'Electrical and Electronics',
    'Food',
    'Drinks',
    'Beverages',
    'Spices',
  ];

  // Fetch all products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`https://api.kelynemedia.co.ke/products/products/84`);
      setProducts(response.data); // Set the fetched products to state
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false); // Set loading to false once the fetch is done
    }
  };

  // Organize products by category
  const organizeProductsByCategory = () => {
    const organizedCategories = {};

    products.forEach((product) => {
      const category = product.category || 'Uncategorized'; // Get the product category
      if (!organizedCategories[category]) {
        organizedCategories[category] = []; // Create a new array for the category if it doesn't exist
      }
      organizedCategories[category].push(product); // Add the product to the category array
    });

    // Filter to keep only categories with at least 10 products
    for (const category in organizedCategories) {
      if (organizedCategories[category].length < 10 && category !== 'All') {
        delete organizedCategories[category]; // Remove categories with less than 10 products
      }
    }

    setCategories(organizedCategories); // Set the organized categories to state
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      organizeProductsByCategory(); // Organize products once they are fetched
    }
  }, [products]);

  // Handle toggling "See More" for each category
  const handleSeeMore = (category) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category], // Toggle between showing more and less products
    }));
  };

  if (loading) {
    return <div>Loading products...</div>; // Loading message
  }

  // Render categories, starting with prioritized categories and then the rest
  return (
    <div className="p-1">
      {prioritizedCategories.map((priorityCategory) => {
        const productsInCategory = categories[priorityCategory] || [];
        const isExpanded = expandedCategories[priorityCategory]; // Check if the category is expanded
        const displayedProducts = isExpanded ? productsInCategory : productsInCategory.slice(0, 8); // Show either 8 or all products

        return (
          productsInCategory.length > 0 && (
            <div key={priorityCategory}>
              <h2 className="text-2xl font-bold my-4">{priorityCategory}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 md:gap-4 lg:gap-4">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.product_id} product={product} />
                ))}
              </div>
              {productsInCategory.length > 8 && (
                <div className="text-center my-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => handleSeeMore(priorityCategory)}
                  >
                    {isExpanded ? 'See Less' : 'See More'}
                  </button>
                </div>
              )}
            </div>
          )
        );
      })}

      {/* Render remaining categories that are not in prioritizedCategories */}
      {Object.keys(categories)
        .filter((category) => !prioritizedCategories.includes(category))
        .map((category) => {
          const isExpanded = expandedCategories[category]; // Check if the category is expanded
          const displayedProducts = isExpanded ? categories[category] : categories[category].slice(0, 8); // Show either 8 or all products

          return (
            <div key={category}>
              <h2 className="text-2xl font-bold my-4">{category}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.product_id} product={product} />
                ))}
              </div>
              {categories[category].length > 8 && (
                <div className="text-center my-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => handleSeeMore(category)}
                  >
                    {isExpanded ? 'See Less' : 'See More'}
                  </button>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};
