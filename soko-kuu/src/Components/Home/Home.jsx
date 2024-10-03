import React from 'react'
import Landingpage from './Landingpage'
import Categories from '../Categories/Categories'
import Services from '../Services/Services'
import Recommended from './Recommended'
import ServiceBanner from '../Services/ServiceBanner'
import Sellers from '../Business/Sellers'
import MostViewed from './MostViewed'

const Home = () => {
  return (
    <div>
        <Landingpage />
        <Categories />
        <Services />
        <Recommended />
        <ServiceBanner />
        <Sellers />
        <MostViewed />
    </div>
  )
}

export default Home