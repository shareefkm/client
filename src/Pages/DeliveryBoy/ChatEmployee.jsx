import React from 'react'
import Chat from '../../assets/Chat'
import Header from '../../Layouts/Header/Header'
import SideBar from '../../Components/DeliveryBoy/SideBar'

function ChatEmployee() {
  return (
    <div>
      <Header value={'/employee/login'} employee={true}/>
      <div className='md:flex'>
        <div>
          <SideBar/>
        </div>
        <div className='md:w-full'>
       <Chat senderRole={'employee'} reciverRole={'userId'}/>
        </div>
      </div>
      
    </div>
  )
}

export default ChatEmployee
