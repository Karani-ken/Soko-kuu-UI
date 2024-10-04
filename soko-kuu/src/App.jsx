import { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Footer from './Components/Footer/Footer'
import CategoryPage from './Components/Categories/CategoryPage'


function App() {


  return (
  
      <div className='md:mx-32'>
        <Navbar />
        {/** <Home />*/}
        <CategoryPage />
        <Footer />

      </div>

    
  )
}

export default App
