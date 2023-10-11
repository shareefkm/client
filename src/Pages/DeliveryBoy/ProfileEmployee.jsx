import React from 'react'

import Header from '../../Layouts/Header/Header'
import EmployeeProfile from '../../Components/DeliveryBoy/EmployeeProfile'
import SideBar from '../../Components/DeliveryBoy/SideBar'

function ProfileEmployee() {
  return (
    <div>
      <Header employee={true}/>
      <div className="md:flex">
        <div>
          <SideBar/>
        </div>
        <div className='md:w-full'>
      <EmployeeProfile/>
        </div>
      </div>
    </div>
  )
}

export default ProfileEmployee
