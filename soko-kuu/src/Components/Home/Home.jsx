import React from 'react'
import Landingpage from './Landingpage'
import Categories from '../Categories/Categories'
import Services from '../Services/Services'
import Recommended from './Recommended'
import ServiceBanner from '../Services/ServiceBanner'

const Home = () => {
  return (
    <div>
        <Landingpage />
        <Categories />
        <Services />
        <Recommended />
        <ServiceBanner />
    </div>
  )
}

export default Home