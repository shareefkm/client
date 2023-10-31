import React, {lazy, Suspense} from 'react'
import Header from '../../Layouts/Header/Header'
import Navbar from '../../Layouts/Header/Navbar'
import Footer from '../../Layouts/Footer/Footer'
// import FilteredRestaurants from '../../Components/Client/FilteredRestaurants'
const FilteredRestaurants = lazy(()=>import('../../Components/Client/FilteredRestaurants'))

function FilteredRestPage() {
  return (
    <div>
      <div className='fixed top-0 z-50 w-full'>
        <Header value={"/login"} user={true}/>
        <Navbar/>
      </div>
        {/* <Layout> */}
        <div className='pt-28'>
        <Suspense fallback= {<div>Loading...</div>}>
        {/* <PopularItems/> */}
        <FilteredRestaurants/>
        </Suspense>
        <Footer/>
        </div>
    </div>
  )
}

export default FilteredRestPage
