import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import EmployeeRegister from '../Pages/DeliveryBoy/EmployeeRegister'
import EmployeeLogin from '../Pages/DeliveryBoy/EmployeeLogin'
import EmployeeHomePage from '../Pages/DeliveryBoy/EmployeeHomePage'
import ProfileEmployee from '../Pages/DeliveryBoy/ProfileEmployee'
import DeliveryHistory from '../Pages/DeliveryBoy/DeliveryHistory '
import EmailVerificationPage from '../Pages/DeliveryBoy/EmailVerificationPage'
import ResetPassEmpl from '../Pages/DeliveryBoy/ResetPassEmpl'
import ChatEmployee from '../Pages/DeliveryBoy/ChatEmployee'

function EmployeeRoute() {
  const isAuth = useSelector((state)=>state.employee)
  // console.log(isAuth);
  return (
    <div>
      <Routes>
        <Route path='/' element = { isAuth.token ? <EmployeeHomePage/> : <EmployeeLogin/> }/>
        <Route path='/register' element = { isAuth.token ? <EmployeeHomePage/> : <EmployeeRegister/> }/>
        <Route path="/verify/:id" element= { <EmailVerificationPage/>} />
        <Route path='/login' element = { isAuth.token ? <EmployeeHomePage/> : <EmployeeLogin/> }/>
        <Route path='/resetPassword/:id' element = {<ResetPassEmpl/>}/>
        <Route path='/profile' element = { isAuth.token ? <ProfileEmployee/> : <EmployeeLogin/> }/>
        <Route path='/deliveryhistory' element = { isAuth.token ? <DeliveryHistory/> : <EmployeeLogin/> }/>
        <Route path='/chat' element = { isAuth.token ? <ChatEmployee/> : <EmployeeLogin/> }/>
      </Routes>
    </div>
  )
}

export default EmployeeRoute
