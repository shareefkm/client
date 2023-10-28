import React from 'react'
import Header from '../../Layouts/Header/Header'
import EmployeeDetail from '../../Components/Admin/EmployeeDetail'
import SideBox from '../../Components/Admin/SideBox'

function Employees() {
  return (
    <div>
      <Header admin={true}/>
      <div className='flex'>
        <div>
          <SideBox/>
        </div>
        <div className='pl-5 md:w-full'>
          <EmployeeDetail/>
        </div>
      </div>
    </div>
  )
}

export default Employees
