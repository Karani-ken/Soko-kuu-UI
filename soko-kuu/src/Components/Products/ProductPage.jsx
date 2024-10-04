import React from 'react'
import Image from '../../assets/furniture.jpeg'
import ProductCard from './ProductCard'
const ProductPage = () => {
    return (
        <div className='min-h-screen mt-5'>
            <div className='bg-slate-200 grid grid-cols-1 md:grid-cols-2'>
                <div className='w-full p-2' >
                    <img src={Image} alt="" className='w-full  rounded-md' />
                    <div className='flex justify-center gap-4 w-full my-2'>
                        <img src={Image} alt="" className='w-32' />
                        <img src={Image} alt="" className='w-32' />
                        <img src={Image} alt="" className='w-32' />
                    </div>
                </div>
                <div className='bg-blue-400 p-2'>
                    <h1 className='text-center text-xl font-bold text-white'>Product name</h1>
                    <p className='text-white mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic deleniti
                        doloremque doloribus libero sint corrupti provident eveniet,
                        reiciendis ducimus unde perferendis ut eos non. Sint molestias
                        similique saepe culpa reprehenderit.
                    </p>
                    <h2 className='my-3 text-teal-800 font-semibold'>Electronics</h2>

                    <h1 className='font-bold text-2xl text-blue-900 mt-3'><sup>Kes</sup> 1,299 /=</h1>

                    <button className='p-2 text-white bg-blue-900 mt-2 rounded-md'>Message Business</button> <br />
                    <button className='p-2 text-white bg-slate-900 mt-2 rounded-md'>Visit Store</button>
                </div>

            </div>
            <div className='bg-white mb-4'>
                <h1 className='text-center font-bold my-2'>Similar Products</h1>
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
        </div>
    )
}

export default ProductPage