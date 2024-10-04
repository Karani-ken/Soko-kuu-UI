import { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Footer from './Components/Footer/Footer'
import CategoryPage from './Components/Categories/CategoryPage'
import ProductPage from './Components/Products/ProductPage'
import Store from './Components/Business/Store'


function App() {


  return (

    <div className='md:mx-32'>
      <Navbar />
      {/** <Home />*/}
      {/** <CategoryPage />*/} 
    {/** <ProductPage />*/}  
    <Store />
      <Footer />

    </div>


  )
}

export default App
