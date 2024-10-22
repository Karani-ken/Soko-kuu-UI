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
    <div className='z-100'>
        <Landingpage />
        <Categories />     
        <Recommended />  
        <AllProducts />       
    </div>
  )
}

export default Home