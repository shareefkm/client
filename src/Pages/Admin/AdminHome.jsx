import React from 'react'
import Header from '../../Layouts/Header/Header'
import EmployeeDetail from '../../Components/Admin/EmployeeDetail'
import RestaurantDetails from '../../Components/Admin/RestaurantDetails'
import SideBox from '../../Components/Admin/SideBox'

function AdminHome() {
  return (
    <div>
      <Header admin={true}/>
      <div className='flex'>
        <div>
          <SideBox/>
        </div>
        <div className='pl-5'>
          <EmployeeDetail/>
          <RestaurantDetails/>
        </div>
      </div>
    </div>
  )
}

export default AdminHome
