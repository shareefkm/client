import React from 'react'
import Header from '../../Layouts/Header/Header'
import SideBox from '../../Components/Admin/SideBox'
import AdminDash from '../../Components/Admin/AdminDash'

function AdminHome() {
  return (
    <div>
      <Header admin={true}/>
      <div className='flex'>
        <div>
          <SideBox/>
        </div>
        <div className='pl-5 md:w-full'>
          <AdminDash/>
        </div>
      </div>
    </div>
  )
}

export default AdminHome
