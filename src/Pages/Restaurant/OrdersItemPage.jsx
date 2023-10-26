import React from 'react'
import Header from '../../Layouts/Header/Header'
import SideBar from '../../Components/Restaurant/SideBar'
import OrdersItems from '../../Components/Restaurant/OrdersItems'

function OrdersItemPage() {
  return (
    <div>
      <Header restaurant= {true}/>
      <div className='lg:flex'>
        <div>
        <SideBar/>
        </div>
        <div className='lg:w-full'>
      <OrdersItems/>
        </div>
      </div>
    </div>
  )
}

export default OrdersItemPage

