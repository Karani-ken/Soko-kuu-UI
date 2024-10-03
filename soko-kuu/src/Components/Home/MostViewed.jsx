import React from 'react'
import ProductCard from '../Products/ProductCard'
const MostViewed = () => {
    return (
        <div className='bg-white text-center my-10 py-4'>
            <h1 className='text-center font-bold  text-xl'>Popular Products </h1>
            <div className='flex justify-end my-1'>
                <button className='p-1 bg-blue-400 text-white rounded mx-2'>See all</button>
            </div>
            <div className='bg-blue-900 p-5 w-full rounded flex justify-around overflow-x-scroll h-72'>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>

        </div>
    )
}

export default MostViewed