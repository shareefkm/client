import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import EmployeeHome from '../Pages/DeliveryBoy/EmployeeHome'
import EmployeeRegister from '../Pages/DeliveryBoy/EmployeeRegister'
import EmployeeLogin from '../Pages/DeliveryBoy/EmployeeLogin'

function EmployeeRoute() {
  const isAuth = useSelector((state)=>state.employee)
  // console.log(isAuth);
  return (
    <div>
      <Routes>
        <Route path='/' element = { isAuth.token ? <EmployeeHome/> : <EmployeeLogin/> }/>
        <Route path='/register' element = { isAuth.token ? <EmployeeHome/> : <EmployeeRegister/> }/>
        <Route path='/login' element = { isAuth.token ? <EmployeeHome/> : <EmployeeLogin/> }/>
      </Routes>
    </div>
  )
}

export default EmployeeRoute
