import React from 'react'
import ProfileRestaurant from '../../Components/Restaurant/ProfileRestaurant'
import Header from '../../Layouts/Header/Header'
import SideBar from '../../Components/Restaurant/SideBar'

function RestaurantProfile() {
  return (
    <div>
        <Header restaurant={true}/>
        <div className='lg:flex'>
          <div>
          <SideBar/>
          </div>
          <div className='lg:w-full'>
      <ProfileRestaurant/>
          </div>
        </div>
    </div>
  )
}

export default RestaurantProfile
