import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from '../Pages/Client/Home'
import UserRegister from '../Pages/Client/UserRegister'
import UserLogin from '../Pages/Client/UserLogin'

function UserRoute() {
  const IsAuth = useSelector((state) => state.user);
  console.log(IsAuth);
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/register' element = { IsAuth.token ? <Home/> : <UserRegister/>}/>
        <Route path='/login' element = { IsAuth.token ? <Home/> : <UserLogin/>}/>
      </Routes>
    </div>
  )
}

export default UserRoute
