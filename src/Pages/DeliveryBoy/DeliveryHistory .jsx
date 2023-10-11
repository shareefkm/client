import React from 'react'
import DeliveryHistoryItem from '../../Components/DeliveryBoy/DeliveryHistoryItem'
import Header from '../../Layouts/Header/Header'
import SideBar from '../../Components/DeliveryBoy/SideBar'

function DeliveryHistory () {
  return (
    <div>
        <Header employee={true}/>
        <div className="md:flex">
            <div>
                <SideBar/>
            </div>
            <div className='md:w-full'>
      <DeliveryHistoryItem/>
            </div>
        </div>
    </div>
  )
}

export default DeliveryHistory 
