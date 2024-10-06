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
import Search from './Components/Home/Search'


function App() {


  return (
    <Router>
      <div className='lg:mx-16'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/category/:category' element={<CategoryPage />} />
          <Route path='/products/:id' element={<ProductPage />} />
          <Route path='/store/:id' element={<Store />} />
          <Route path='/servicepage/:id' element={<ServicePage />} />
          <Route path='/all-products' element={<AllProducts />} />
          <Route path='/search/:searchTerm' element={<Search />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
