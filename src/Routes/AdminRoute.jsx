import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import AdminHome from '../Pages/Admin/AdminHome'
import AdminLogin from '../Pages/Admin/AdminLogin'
import Coupon from '../Pages/Admin/Coupon'
import Employees from '../Pages/Admin/Employees'
import Restaurants from '../Pages/Admin/Restaurants'

function AdminRoute() {
  const isAuth = useSelector((state)=>state.admin)
  return (
    <div>
      <Routes>
        <Route path='/' element={isAuth.token ? <AdminHome/> : <AdminLogin/>}/>
        <Route path='/coupon' element={isAuth.token ? <Coupon/> : <AdminLogin/>}/>
        <Route path='/employees' element={isAuth.token ? <Employees/> : <AdminLogin/>}/>
        <Route path='/restaurants' element={isAuth.token ? <Restaurants/> : <AdminLogin/>}/>
      </Routes>
    </div>
  )
}

export default AdminRoute
