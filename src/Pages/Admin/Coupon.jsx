import React from 'react'
import Header from '../../Layouts/Header/Header'
import SideBox from '../../Components/Admin/SideBox'
import Coupons from '../../Components/Admin/Coupons'

function Coupon() {
  return (
    <div>
      <Header admin={true}/>
      <div className="flex">
      <div>
          <SideBox/>
        </div>
        <div className='pl-5'>
          <Coupons/>
        </div>
      </div>
    </div>
  )
}

export default Coupon
