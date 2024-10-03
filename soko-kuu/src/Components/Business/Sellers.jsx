import React from 'react'
import SellerCard from './SellerCard'

const Sellers = () => {
    return (
        <div className='bg-white text-center my-10 py-4'>
            <h1 className='text-center font-bold  text-xl'>Soko-kuu sellers</h1>
            <div className='flex justify-end my-1'>
                <button className='p-1 bg-blue-400 text-white rounded mx-2'>See all</button>
            </div>
            <div className='bg-slate-100 p-5 w-full rounded flex justify-around overflow-x-scroll h-80'>
                <SellerCard />
                <SellerCard />
                <SellerCard />
                <SellerCard />
                <SellerCard />
            </div>
        </div>
    )
}

export default Sellers