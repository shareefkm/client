import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import AdminHome from '../Pages/Admin/AdminHome'
import AdminLogin from '../Pages/Admin/AdminLogin'

function AdminRoute() {
  const isAuth = useSelector((state)=>state.admin)
  return (
    <div>
      <Routes>
        <Route path='/' element={isAuth.token ? <AdminHome/> : <AdminLogin/>}/>
      </Routes>
    </div>
  )
}

export default AdminRoute
