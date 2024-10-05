import React from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/soko-kuu.png';
const ServiceCard = ({name, banner, description}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/servicepage')
  }
  return (
    <div className='min-w-52 p-2 mx-5 border rounded shadow bg-white text-center' onClick={handleNavigate}>
        <img src={Logo} alt="" className='max-h-40 h-32 w-full' />
        <h1 className='font-bold text-xl my-1'>Taxi Bay</h1>
        <p className='text-medium  whitespace-nowrap overflow-hidden text-ellipsis'>Lorem ipsum dolor sit amet</p>
        <button className='text-medium bg-blue-900 text-white p-1 rounded-xl'>View Services</button>
    </div>
  )
}

export default ServiceCard