import React from 'react'
import ServiceCard from './ServiceCard'

const Services = () => {
    return (
        <div className='bg-white-100  mb-4 h-80 '>
            <h1 className='text-center font-bold  text-xl'>Soko-Kuu Services </h1>
            <div className='flex justify-end my-1'>
                <button className='p-1 bg-blue-400 text-white rounded'>See all</button>
            </div>
            <div className='bg-slate-100 p-5 w-full  flex justify-around overflow-x-scroll rounded-md'>
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
            </div>

        </div>
    )
}

export default Services