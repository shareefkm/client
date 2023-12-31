import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from '../Pages/Client/Home'
import UserRegister from '../Pages/Client/UserRegister'
import UserLogin from '../Pages/Client/UserLogin'
import UserProfile from '../Pages/Client/UserProfile'
import CartPage from '../Pages/Client/CartPage'
import CheckoutPage from '../Pages/Client/CheckoutPage'
import OrderPage from '../Pages/Client/OrderPage'
import ShopPage from '../Pages/Client/ShopPage'
import MenuPage from '../Pages/Client/MenuPage'
import EmailVerificationPage from '../Pages/Client/EmailVerificationPage'
import ResetPass from '../Pages/Client/ResetPass'
import OrederItemsPage from '../Pages/Client/OrederItemsPage'
import ClientChat from '../Pages/Client/ClientChat'
import FilteredRestPage from '../Pages/Client/FilteredRestPage'

function UserRoute() {
  const IsAuth = useSelector((state) => state.user);
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/shops' element = {<ShopPage/>}/>
        <Route path='/filtershops/:catName' element = {<FilteredRestPage/>}/>
        <Route path='/menu/:restId' element = {<MenuPage/>}/>
        <Route path='/register' element = { IsAuth.token ? <Home/> : <UserRegister/>}/>
        <Route path="/verify/:id" element= { <EmailVerificationPage/>} />
        <Route path='/login' element = { IsAuth.token ? <Home/> : <UserLogin/>}/>
        <Route path='/resetPassword/:id' element = {<ResetPass/>}/>
        <Route path='/profile' element = { IsAuth.token ? <UserProfile/> : <UserLogin/>}/>
        <Route path='/cart' element = { IsAuth.token ? <CartPage/> : <UserLogin/>}/>
        <Route path='/checkout' element = { IsAuth.token ? <CheckoutPage/> : <UserLogin/>}/>
        <Route path='/orders' element = { IsAuth.token ? <OrderPage/> : <UserLogin/>}/>
        <Route path='/orderitems/:ordId' element = { IsAuth.token ? <OrederItemsPage/> : <UserLogin/>}/>
        <Route path='/chat/' element = { IsAuth.token ? <ClientChat/> : <UserLogin/>}/>
      </Routes>
    </div>
  )
}

export default UserRoute
