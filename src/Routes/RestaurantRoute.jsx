import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import RestaurantRegister from '../Pages/Restaurant/RestaurantRegister'
import RestaurantLogin from '../Pages/Restaurant/RestaurantLogin'
import RestaurantHome from '../Pages/Restaurant/RestaurantHome'
import RestaurantProfile from '../Pages/Restaurant/RestaurantProfile'
import ProductAdd from '../Pages/Restaurant/ProductAdd'
import ProductsPage from '../Pages/Restaurant/ProductsPage'
import OrdersDataPage from '../Pages/Restaurant/OrdersDataPage'
import ProductEdit from '../Pages/Restaurant/ProductEdit'
import CategoryPage from '../Pages/Restaurant/CategoryPage'

function RestaurantRoute() {
    const isAuth = useSelector((state)=>state.restaurant)
  return (
    <div>
      <Routes>
        <Route path='/' element = { isAuth.token ? <RestaurantHome/> : <RestaurantLogin/> }/>
        <Route path='/register' element = { isAuth.token ? <RestaurantHome/> : <RestaurantRegister/> }/>
        <Route path='/login' element = { isAuth.token ? <RestaurantHome/> : <RestaurantLogin/> }/>
        <Route path='/profile' element = { isAuth.token ? <RestaurantProfile/> : <RestaurantLogin/> }/>
        <Route path='/addproduct' element = { isAuth.token ? <ProductAdd/> : <RestaurantLogin/> }/>
        <Route path='/profile' element = { isAuth.token ? <RestaurantProfile/> : <RestaurantLogin/> }/>
        <Route path='/category' element = { isAuth.token ? <CategoryPage/> : <RestaurantLogin/> }/>
        <Route path='/products' element = { isAuth.token ? <ProductsPage/> : <RestaurantLogin/> }/>
        <Route path='/orders' element = { isAuth.token ? <OrdersDataPage/> : <RestaurantLogin/> }/>
        <Route path='/editproduct/:productId' element = { isAuth.token ? <ProductEdit/> : <RestaurantLogin/> }/>
      </Routes>
    </div>
  )
}

export default RestaurantRoute

