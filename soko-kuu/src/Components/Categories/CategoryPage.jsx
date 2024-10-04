import React from 'react'
import Banner from '../../assets/Consumer-Electronics.png'
import ProductCard from '../Products/ProductCard'
import SellerCard from '../Business/SellerCard'
const CategoryPage = () => {
  return (
    <div className='min-h-screen'>
      <div className='bg-slate-100 w-full h-52 mt-4 shadow-md border rounded'
        style={{
          backgroundImage: `url(${Banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className='text-center text-white bg-blue-900  rounded-sm lg:mx-96 my-8 font-bold p-3'>Consumer Electronics</h1>

      </div>
      <div className='bg-slate-100 bg-opacity-80 border lg:mx-28 mt-[-10%] rounded-md p-3'>
        <h1 className='text-center text-black font-bold mb-4  lg:mx-80 rounded'>Top Products</h1>
        <div className='flex w-full justify-around overflow-x-auto py-2'>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
      <div className='bg-white mb-4'>
        <h1 className='text-center font-bold my-2'>Recommended Products in this category</h1>
        <div className='flex justify-end my-1'>
          <button className='p-1 bg-blue-400 text-white rounded mx-2'>See all</button>
        </div>
        <div className='flex w-full bg-slate-200 justify-around overflow-x-auto py-2 rounded-md'>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
      <div className='mb-4'>
        <h1 className='text-center font-bold my-2'>Recommended Sellers in this category</h1>
        <div className='flex justify-end my-1'>
          <button className='p-1 bg-blue-400 text-white rounded mx-2'>See all</button>
        </div>
        <div className='flex w-full bg-white justify-around overflow-x-auto py-2 rounded-md'>
          <SellerCard />
          <SellerCard />
          <SellerCard />
          <SellerCard />
          <SellerCard />
        </div>
      </div>


    </div>
  )
}

export default CategoryPage