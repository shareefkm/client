import React from 'react'
import Tables from './Tables'

function EmployeeDetail() {
  return (
    <div>
        <h1 className='mb-5 mt-5 text-center text-lg font-bold'>Employees</h1>
      <Tables path={'/getemployees'} action={'/employeestatus'}/>
    </div>
  )
}

export default EmployeeDetail
