import React from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/soko-kuu.png';
const SellerCard = ({ name, banner }) => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/store')
  }
  return (
    <div
    onClick={handleNavigate}
      className="min-w-52 h-56 mx-5 cursor-pointer relative rounded-lg overflow-hidden p-2 bg-gray-50"
      style={{
        backgroundImage: `url(${banner || Logo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20 ">
        <h1 className='text-center mt-32 text-white bg-blue-400 font-semibold'>Business ABC</h1>

        <div className="flex justify-center mt-5">
          <button className='text-white bg-blue-400 rounded-lg bg-opacity-80 p-2'>Visit Store</button>
        </div>

      </div>
    </div>
  )
}

export default SellerCard