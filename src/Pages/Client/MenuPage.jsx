import React, {lazy, Suspense} from 'react'
import Header from '../../Layouts/Header/Header'
import Banner from '../../Components/Client/Banner'
import Layout from '../../Layouts/Layout'
import Menu from '../../Components/Client/Menu'
import ProductDetailModal from '../../Components/Client/ProductDetailModal'

function MenuPage() {
  return (
    <div >
      <Header value={"/login"} user={true}/>
      <div className='bg-off-White'>
        <Layout>
        <Menu/>
        </Layout>
      </div>
    </div>
  )
}

export default MenuPage
