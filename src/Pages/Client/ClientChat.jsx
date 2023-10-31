import React from 'react'
import Chat from '../../assets/Chat'
import Header from '../../Layouts/Header/Header'
import Navbar from '../../Layouts/Header/Navbar'
// import Layout from '../../Layouts/Layout'

function ClientChat() {
  return (
    <div>
    <div className='fixed top-0 w-full z-50'>
    <Header user={true}/>
    <Navbar/>
    </div>
    <div className='pt-28'>
      <Chat senderRole={'user'} reciverRole={'employeeId'}/>
    </div>
  </div>
  )
}

export default ClientChat
