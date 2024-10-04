import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Footer from './Components/Footer/Footer'
import CategoryPage from './Components/Categories/CategoryPage'
import ProductPage from './Components/Products/ProductPage'
import Store from './Components/Business/Store'


function App() {


  return (
    <Router>
      <div className='md:mx-32'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/category' element={<CategoryPage />} />
          <Route path='/productpage' element={<ProductPage />} />
          <Route path='/store' element={<Store />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
