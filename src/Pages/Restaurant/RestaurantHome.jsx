import React from 'react'
import SideBar from '../../Components/Restaurant/SideBar'
import Header from '../../Layouts/Header/Header'
import RestaurantDashboard from '../../Components/Restaurant/RestaurantDashboard'

function RestaurantHome() {
  return (
    <div>
      <Header value={"/restaurant/login"} restaurant={true}/>
      <div className="md:flex">
      <div>
      <SideBar/>
      </div>
      <div className='md:w-full'>
        <RestaurantDashboard/>
      </div>
      </div>
    </div>
  )
}

export default RestaurantHome
