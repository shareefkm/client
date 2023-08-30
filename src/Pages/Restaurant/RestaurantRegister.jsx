import React from 'react'
import Register from '../../Components/Client/Register'

function RestaurantRegister() {
    const restaurant = true
  return (
    <div>
      <Register restaurant = {restaurant}/>
    </div>
  )
}

export default RestaurantRegister
