import React, {lazy, Suspense} from 'react'
import Header from '../../Layouts/Header/Header'
import Layout from '../../Layouts/Layout'
import OrderItems from '../../Components/Client/OrderItems'

function OrederItemsPage() {
  return (
    <div>
      <Header user={true}/>
      <Layout>
        <OrderItems/>
      </Layout>
    </div>
  )
}

export default OrederItemsPage
