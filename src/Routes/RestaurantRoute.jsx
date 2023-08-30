import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RestaurantRegister from '../Pages/Restaurant/RestaurantRegister'
import RestaurantLogin from '../Pages/Restaurant/RestaurantLogin'
import { useSelector } from 'react-redux'
import RestaurantHome from '../Pages/Restaurant/RestaurantHome'

function RestaurantRoute() {
    const isAuth = useSelector((state)=>state.restaurant)
    console.log(isAuth);
  return (
    <div>
      <Routes>
        <Route path='/' element = {<RestaurantHome/>}/>
        <Route path='/register' element = { isAuth.token ? <RestaurantHome/> : <RestaurantRegister/> }/>
        <Route path='/login' element = { isAuth.token ? <RestaurantHome/> : <RestaurantLogin/> }/>
      </Routes>
    </div>
  )
}

export default RestaurantRoute

