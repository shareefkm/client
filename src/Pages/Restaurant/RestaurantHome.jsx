import React from 'react'
import SideBar from '../../Components/Restaurant/SideBar'
import Header from '../../Layouts/Header/Header'

function RestaurantHome() {
  return (
    <div>
      <Header value={"/restaurant/login"} restaurant={true}/>
      <div className="flex">
      <div>
      <SideBar/>
      </div>
      <div>
        
      </div>
      </div>
    </div>
  )
}

export default RestaurantHome
