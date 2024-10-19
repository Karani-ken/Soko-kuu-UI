import React from 'react'
import Landingpage from './Landingpage'
import Categories from '../Categories/Categories'
import Services from '../Services/Services'
import Recommended from './Recommended'
import ServiceBanner from '../Services/ServiceBanner'
import Sellers from '../Business/Sellers'
import MostViewed from './MostViewed'
import { AllProducts } from './AllProducts'

const Home = () => {
  return (
    <div>
        <Landingpage />
        <Categories />     
        <Recommended />  
        <AllProducts />    
        <MostViewed />
    </div>
  )
}

export default Home