import React from 'react'
import Tables from './Tables'

function RestaurantDetails() {
  return (
    <div>
       <h1 className='mb-5 mt-5 text-center text-lg font-bold'>Restaurant</h1>
      <Tables path={'/geterestaurant'} action={'/restaurantstatus'}/>
    </div>
  )
}

export default RestaurantDetails
