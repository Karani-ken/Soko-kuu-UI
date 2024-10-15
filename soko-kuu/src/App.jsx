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
import AllServices from './Components/Services/AllServices'
import AllCategories from './Components/Categories/AllCategories'
import AllBusinesses from './Components/Business/AllBusinesses'
import Login from './Components/Authentication/Login'
import RegisterForm from './Components/Authentication/RegisterForm'
import PasswordResetForm from './Components/Authentication/PasswordResetForm'
import ResetPassword from './Components/Authentication/ResetPassword'
import ProfilePage from './Components/Profile/ProfilePage'


function App() {


  return (
    <Router>
      <div className='lg:mx-16'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<RegisterForm />} />
          <Route path='/password-reset' element={<PasswordResetForm/>} />
          <Route path='/reset-form' element={<ResetPassword />} />
          <Route path='/category/:category' element={<CategoryPage />} />
          <Route path='/products/:id' element={<ProductPage />} />
          <Route path='/store/:id' element={<Store />} />
          <Route path='/servicepage/:id' element={<ServicePage />} />
          <Route path='/all-products' element={<AllProducts />} />
          <Route path='/businesses' element={<AllBusinesses />} />
          <Route path='/all-services' element={<AllServices />} />
          <Route path='/all-categories' element={<AllCategories />} />
          <Route path='/search/:searchTerm' element={<Search />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
