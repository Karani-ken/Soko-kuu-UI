import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Footer from './Components/Footer/Footer'
import CategoryPage from './Components/Categories/CategoryPage'
import ProductPage from './Components/Products/ProductPage'
import Store from './Components/Business/Store'
import ServicePage from './Components/Services/ServicePage'
import AllProducts from './Components/Products/AllProducts'


function App() {


  return (
    <Router>
      <div className='lg:mx-32'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/category' element={<CategoryPage />} />
          <Route path='/products/:id' element={<ProductPage />} />
          <Route path='/store' element={<Store />} />
          <Route path='/servicepage' element={<ServicePage />} />
          <Route path='/all-products' element={<AllProducts />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
