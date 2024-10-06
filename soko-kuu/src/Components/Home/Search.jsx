import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SellerCard from '../Business/SellerCard';
import ProductCard from '../Products/ProductCard';
import ServiceCard from '../Services/ServiceCard';
import CategoryCard from '../Categories/CategoryCard';

const Search = () => {
  const { searchTerm } = useParams();
  const [businesses, setBusinesses] = useState([]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  // Fetch data from the endpoints
  const fetchData = async () => {
    try {
      const [businessesResponse, productsResponse, servicesResponse, categoriesResponse] = await Promise.all([
        axios.get('https://api.kelynemedia.co.ke/auth/users'),
        axios.get('https://api.kelynemedia.co.ke/products/all'),
        axios.get('https://api.kelynemedia.co.ke/services/all'),
        axios.get('https://api.kelynemedia.co.ke/categories/all-categories'),
      ]);
      setBusinesses(businessesResponse.data);
      setProducts(productsResponse.data);
      setServices(servicesResponse.data);
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter results whenever the search term or data changes
  useEffect(() => {
    if (searchTerm) {
      setFilteredBusinesses(businesses.filter(business => business?.name.toLowerCase().includes(searchTerm.toLowerCase())));
      setFilteredProducts(products.filter(product => product?.product_name.toLowerCase().includes(searchTerm.toLowerCase())));
      setFilteredServices(services.filter(service => service?.service_name.toLowerCase().includes(searchTerm.toLowerCase())));
      setFilteredCategories(categories.filter(category => category?.category_name.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      // Reset filtered results if searchTerm is empty
      setFilteredBusinesses([]);
      setFilteredProducts([]);
      setFilteredServices([]);
      setFilteredCategories([]);
    }
  }, [searchTerm, businesses, products, services, categories]);

  return (
    <div className="p-4 min-h-screen">
      {/* Search Results */}
      <div>
        {searchTerm && (
          <>
            <h2 className="font-bold mt-4">Businesses</h2>
            <div className="flex flex-wrap">
              {filteredBusinesses.length > 0 ? (
                filteredBusinesses.map((seller) => <SellerCard key={seller.id} seller={seller} />)
              ) : (
                <p>No matching businesses found.</p>
              )}
            </div>

            <h2 className="font-bold mt-4">Products</h2>
            <div className="flex flex-wrap">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => <ProductCard key={product.product_id} product={product} />)
              ) : (
                <p>No matching products found.</p>
              )}
            </div>

            <h2 className="font-bold mt-4">Services</h2>
            <div className="flex flex-wrap">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => <ServiceCard key={service.service_id} service={service} />)
              ) : (
                <p>No matching services found.</p>
              )}
            </div>

            <h2 className="font-bold mt-4">Categories</h2>
            <div className="flex flex-wrap">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => <CategoryCard key={category.category_id} name={category.category_name} banner={category.banner} />)
              ) : (
                <p>No matching categories found.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
