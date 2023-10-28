import React from 'react'
import Chat from '../../assets/Chat'
import Header from '../../Layouts/Header/Header'
// import Layout from '../../Layouts/Layout'

function ClientChat() {
  return (
    <div>
    <Header user={true}/>
    {/* <Layout> */}
      <Chat senderRole={'user'} reciverRole={'employeeId'}/>
    {/* </Layout> */}
  </div>
  )
}

export default ClientChat
