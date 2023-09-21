import React from 'react'
import Header from '../../Layouts/Header/Header'
import Layout from "../../Layouts/Layout";
import Checkout from '../../Components/Client/Checkout';

function CheckoutPage() {
  return (
    <div>
      <Header user={true}/>
      <Layout>
        <Checkout/>
      </Layout>
    </div>
  )
}

export default CheckoutPage
