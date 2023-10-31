import React, { useEffect, useState } from 'react'
import UserAxios from '../../Axios/UserAxios'
import { useNavigate } from 'react-router-dom'

function OurCategories() {
  const [categories, setCategories] = useState([])

  const navigate = useNavigate()

  useEffect(()=>{
    UserAxios.get('/getcategories').then((response)=>{
      setCategories(response.data.categories)
    })
  },[])
  return (
    <div>
      <div className='pt-10'>
        <div>
          <h1 className='font-sans text-amber-500 font-bold tracking-wider flex items-center justify-center text-lg pb-3'>TOP FOODS</h1>
            <h1 className='font-sans font-bold flex items-center justify-center text-5xl'>Our Categories</h1>
            <div className='flex items-center justify-center pt-6 '>
                <span className='border border-t-2 border-amber-500 w-10'></span>
                <span className='border border-t-2 border-amber-500 w-1 ml-1'></span>
                <span className='border border-t-2 border-amber-500 w-1  ml-1'></span>
                <span className='border border-t-2 border-amber-500 w-1 ml-1'></span>
            </div>
        </div>
        <div className="container mx-auto px-5">
      <div className="text-3xl font-semibold mb-4 flex items-center justify-center"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {categories?.map((item, index) => (
          <div key={index} className="mb-10 cursor-pointer" onClick={()=>navigate(`/filtershops/${item._id.name}`)} >
            <div className="flex items-center justify-center rounded-full">
              <img
                src={item._id.image}
                alt={item._id.name}
                className="sm:w-64 sm:h-64 w-72 h-72 rounded-full"
              />
            </div>
            <div className="flex justify-center items-center">
              <h4 className="text-xl font-bold mt-2">{item._id.name}</h4>
            </div>
            <div className="flex items-center justify-center">
              <h4 className="text-lg text-gray-500">{item.count}  Restaurants Products</h4>
            </div>
          </div>
         ))}
      </div>
    </div>
      </div>
    </div>
  )
}

export default OurCategories
