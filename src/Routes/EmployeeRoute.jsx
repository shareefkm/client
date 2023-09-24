import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import EmployeeRegister from '../Pages/DeliveryBoy/EmployeeRegister'
import EmployeeLogin from '../Pages/DeliveryBoy/EmployeeLogin'
import EmployeeHomePage from '../Pages/DeliveryBoy/EmployeeHomePage'

function EmployeeRoute() {
  const isAuth = useSelector((state)=>state.employee)
  // console.log(isAuth);
  return (
    <div>
      <Routes>
        <Route path='/' element = { isAuth.token ? <EmployeeHomePage/> : <EmployeeLogin/> }/>
        <Route path='/register' element = { isAuth.token ? <EmployeeHomePage/> : <EmployeeRegister/> }/>
        <Route path='/login' element = { isAuth.token ? <EmployeeHomePage/> : <EmployeeLogin/> }/>
      </Routes>
    </div>
  )
}

export default EmployeeRoute
