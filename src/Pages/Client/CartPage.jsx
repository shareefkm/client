import React from 'react'
import Header from '../../Layouts/Header/Header'
import Layout from '../../Layouts/Layout'
import Cart from '../../Components/Client/Cart'
import Navbar from '../../Layouts/Header/Navbar'
import Footer from '../../Layouts/Footer/Footer'

function CartPage() {
  return (
    <div>
      <div className='fixed top-0 z-50 w-full'>
      <Header user={true}/>
      <Navbar/>
      </div>
      <div className='pt-28'>
        <Cart/>
      <Footer/>
      </div>
    </div>
  )
}

export default CartPage
