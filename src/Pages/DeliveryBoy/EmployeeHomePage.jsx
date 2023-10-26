import React from 'react'

import Header from '../../Layouts/Header/Header'
import EmployeeHome from '../../Components/DeliveryBoy/EmployeeHome'
import SideBar from '../../Components/DeliveryBoy/SideBar'
// import Map from '../../assets/Map'

function EmployeeHomePage() {
  return (
    <div>
      <Header value={'/employee/login'} employee={true}/>
      <div className='md:flex'>
        <div>
          <SideBar/>
        </div>
        <div className='md:w-full'>
        <EmployeeHome/>
        {/* <Map/> */}
        </div>
      </div>
      
    </div>
  )
}

export default EmployeeHomePage
