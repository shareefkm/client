import React from 'react'
import SideBar from '../../Components/Restaurant/SideBar'
import Category from '../../Components/Restaurant/Category'
import Header from '../../Layouts/Header/Header'

function CategoryPage() {
  return (
    <div>
        <Header restaurant={true}/>
      <div className="lg:flex">
        <div>
            <SideBar/>
        </div>
        <div className='lg:w-full'>
            <Category/>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
