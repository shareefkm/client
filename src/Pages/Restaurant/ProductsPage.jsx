import React from 'react'
import Products from '../../Components/Restaurant/Products'
import Header from '../../Layouts/Header/Header'
import SideBar from '../../Components/Restaurant/SideBar'

function ProductsPage() {
  return (
    <div>
        <Header restaurant={true}/>
        <div className='lg:flex'>
          <div>
        <SideBar/>
          </div>
          <div className='lg:w-full'>
      <Products/>
          </div>
        </div>
    </div>
  )
}

export default ProductsPage
