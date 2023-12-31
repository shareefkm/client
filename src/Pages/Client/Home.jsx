import React, {lazy, Suspense} from 'react'
import Header from '../../Layouts/Header/Header'
import Banner from '../../Components/Client/Banner'
import Layout from '../../Layouts/Layout'
import Navbar from '../../Layouts/Header/Navbar'
import Footer from '../../Layouts/Footer/Footer'
import OurCategories from '../../Components/Client/OurCategories'
// import PopularItems from '../../Components/Client/PopularItems'
const PopularItems = lazy(()=>import('../../Components/Client/PopularItems'))

function Home() {
  return (
    <div>
      <div className='fixed top-0 z-50 w-full'>
        <Header value={"/login"} user={true}/>
        <Navbar/>
      </div>
        {/* <Layout> */}
        <div className='pt-28'>
        <Banner/>
        <Suspense fallback= {<div>Loading...</div>}>
        {/* <PopularItems/> */}
        <OurCategories/>
        </Suspense>
        <Footer/>
        </div>
        {/* </Layout> */}
    </div>
  )
}

export default Home
