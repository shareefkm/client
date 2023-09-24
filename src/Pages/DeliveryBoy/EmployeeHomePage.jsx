import React from 'react'

import Header from '../../Layouts/Header/Header'
import EmployeeHome from '../../Components/DeliveryBoy/EmployeeHome'

function EmployeeHomePage() {
  return (
    <div>
      <Header value={'/employee/login'} employee={true}/>
      <EmployeeHome/>
      
    </div>
  )
}

export default EmployeeHomePage
