import React, {lazy, Suspense} from 'react'
import Header from '../../Layouts/Header/Header'
import Layout from '../../Layouts/Layout'
// import Orders from '../../Components/Client/Orders'
const Orders = lazy(()=>import('../../Components/Client/Orders'))

function OrderPage() {
  return (
    <div>
      <Header user={true}/>
      <Layout>
      <Suspense fallback= {<div>Loading...</div>}>
        <Orders/>
      </Suspense>
      </Layout>
    </div>
  )
}

export default OrderPage
