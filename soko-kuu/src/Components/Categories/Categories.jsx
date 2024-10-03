import React from 'react'
import CategoryCard from './CategoryCard'
import Logo from '../../assets/soko-kuu.png';
const Categories = () => {
    const categories = [
        { id: 1, name: 'Category 1', banner: Logo },
        { id: 2, name: 'Category 2', banner: 'path_to_banner_image_2' },
        { id: 3, name: 'Category 3', banner: 'path_to_banner_image_3' },
        { id: 4, name: 'Category 4', banner: 'path_to_banner_image_4' },
        { id: 5, name: 'Category 5', banner: 'path_to_banner_image_5' },
        { id: 6, name: 'Category 6', banner: 'path_to_banner_image_6' },
        { id: 7, name: 'Category 7', banner: 'path_to_banner_image_7' },
        { id: 8, name: 'Category 8', banner: 'path_to_banner_image_8' },
    ];
    return (
        <div className='h-80 mb-4 bg-white  rounded' >
            <h2 className='text-center text-xl font-bold'>Product Categories</h2>
            <div className='flex justify-end my-1'>
                <button className='p-1 bg-blue-400 text-white rounded mx-2'>See all</button>
            </div>
            <div className="w-full overflow-x-auto bg-sky-100 rounded-md">
                <div className="flex justify-around p-3">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            name={category.name}
                            banner={category.banner}
                        />
                    ))}
                </div>
            </div>


        </div>
    )
}

export default Categories