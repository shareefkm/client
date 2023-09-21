import React from 'react'
import Login from '../../Components/Client/Login'

function RestaurantLogin() {
    const restaurant = true
  return (
    <div>
      <Login restaurant={restaurant}/>
    </div>
  )
}

export default RestaurantLogin
