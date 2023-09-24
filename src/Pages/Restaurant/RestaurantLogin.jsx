import React from 'react'
import Login from '../../Components/Login'

function RestaurantLogin() {
    const restaurant = true
  return (
    <div>
      <Login restaurant={restaurant}/>
    </div>
  )
}

export default RestaurantLogin
