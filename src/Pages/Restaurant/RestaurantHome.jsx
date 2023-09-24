import React from 'react'
import SideBar from '../../Components/Restaurant/SideBar'
import Header from '../../Layouts/Header/Header'

function RestaurantHome() {
  return (
    <div>
      <Header value={"/restaurant/login"} restaurant={true}/>
      <SideBar/>
    </div>
  )
}

export default RestaurantHome
