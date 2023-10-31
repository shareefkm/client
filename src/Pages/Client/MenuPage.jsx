import React, {lazy, Suspense} from 'react'
import Header from '../../Layouts/Header/Header'
import Menu from '../../Components/Client/Menu'
import Navbar from '../../Layouts/Header/Navbar'
import Footer from '../../Layouts/Footer/Footer'

function MenuPage() {
  return (
    <div >
      <div className='fixed top-0 w-full z-50'>
      <Header value={"/login"} user={true}/>
        <Navbar/>
      </div>
      <div className='pt-28'>
        <Menu/>
        <Footer/>
      </div>
    </div>
  )
}

export default MenuPage
