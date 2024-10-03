import React from 'react'
import Watch from '../../assets/watch.jpg'
const ProductCard = () => {
  return (
    <div className='min-w-48 mx-5 rounded max-w-64 bg-white text-left shadow-sm  border'>
        <img src={Watch} alt="" className='max-h-56' />
        <h2 className='p-1 font-medium whitespace-nowrap overflow-hidden text-ellipsis'>Baby Clothes</h2>
        <h1 className='font-black p-1 text-xl'>Kes 1,599 /=</h1>
    </div>
  )
}

export default ProductCard