import React from 'react'
import Logo from '../../assets/soko-kuu.png'
import { LuBadgeCheck } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import ProductCard from '../Products/ProductCard'
const Store = () => {
    return (
        <div className='min-h-screen mt-4'>
            <div className='bg-black text-white p-1 md:p-0 md:h-40 gap-3 rounded grid grid-cols-1 md:grid-cols-4'>
                <div className='flex justify-center align-middle p-3'>
                    <img src={Logo} alt="" className='w-32' />
                </div>
                <div className='p-2'>
                    <h1 className='font-bold text-xl flex'>Business Name <LuBadgeCheck className='text-yellow-500  m-1.5' /></h1>
                    <p>Nyeri</p>
                    <button className='p-2 bg-blue-900 mt-4'> see Location</button>
                </div>
                <div>
                    <p className='text-sm md:p-0 p-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Similique voluptatem facilis deserunt nemo, eius debitis
                        repellat ipsam voluptatibus porro
                        officiis et nam enim maiores nihil.
                        Error repellendus exercitationem voluptatibus quod?
                    </p>
                    <h2 className='font-medium mt-2'>Electronics</h2>
                </div>
                <div className='text-center'>
                    <button className='bg-blue-400 mt-2 p-2 rounded'>Message Chat</button>
                </div>
            </div>
            <div className='bg-blue-400 mt-4 p-5 rounded md:flex justify-between'>
                <h1 className='text-white text-xl font-bold'>Products: 15</h1>
                <div className='bg-white p-1 rounded-md'>
                    <input type="text" placeholder='search from store ' className='rounded p-1 border' />
                    <button className='bg-blue-900 p-2 mx-2 text-white rounded'><FaSearch /></button>
                </div>
            </div>

            <div className='bg-slate-100 mt-4 rounded p-3 mb-4'>
                <h1 className='text-center font-bold'>All products</h1>
                <div className='md:p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-x-auto'>
                    <ProductCard />
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

export default Store