import React from 'react'
import Header from '../../Layouts/Header/Header'
import Layout from '../../Layouts/Layout'
import Orders from '../../Components/Client/Orders'

function OrderPage() {
  return (
    <div>
      <Header user={true}/>
      <Layout>
        <Orders/>
      </Layout>
    </div>
  )
}

export default OrderPage
