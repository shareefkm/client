import React from 'react'
import EditProduct from '../../Components/Restaurant/EditProduct'
import Header from '../../Layouts/Header/Header'
import SideBar from '../../Components/Restaurant/SideBar'

function ProductEdit() {
  return (
    <div>
        <Header restaurant={true}/>
        <div className="md:flex">
        <div>
        <SideBar/>
        </div>
        <div className="md:w-full">
      <EditProduct/>
      </div>
      </div>
    </div>
  )
}

export default ProductEdit
