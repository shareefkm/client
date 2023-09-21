import React from 'react'
import Header from '../../Layouts/Header/Header'
import Layout from '../../Layouts/Layout'
import Cart from '../../Components/Client/Cart'

function CartPage() {
  return (
    <div>
      <Header user={true}/>
      <Layout>
        <Cart/>
      </Layout>
    </div>
  )
}

export default CartPage
