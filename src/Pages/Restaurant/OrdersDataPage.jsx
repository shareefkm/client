import React from 'react'
import Header from '../../Layouts/Header/Header'
import OrdersData from '../../Components/Restaurant/OrdersData'
import SideBar from '../../Components/Restaurant/SideBar'

function OrdersDataPage() {
  return (
    <div>
      <Header restaurant= {true}/>
      <div className='lg:flex'>
        <div>
        <SideBar/>
        </div>
        <div className='lg:w-full'>
      <OrdersData/>
        </div>
      </div>
    </div>
  )
}

export default OrdersDataPage
