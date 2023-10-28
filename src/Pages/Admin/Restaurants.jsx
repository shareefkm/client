import React from 'react'
import Header from '../../Layouts/Header/Header'
import RestaurantDetails from '../../Components/Admin/RestaurantDetails'
import SideBox from '../../Components/Admin/SideBox'

function Restaurants() {
  return (
    <div>
      <Header admin={true}/>
      <div className='flex'>
        <div>
          <SideBox/>
        </div>
        <div className='pl-5 md:w-full'>
          <RestaurantDetails/>
        </div>
      </div>
    </div>
  )
}

export default Restaurants
