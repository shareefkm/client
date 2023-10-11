import React, {lazy, Suspense} from 'react'
import Header from '../../Layouts/Header/Header'
import Layout from '../../Layouts/Layout'
// import Shops from '../../Components/Client/Shops'
// import PopularItems from '../../Components/Client/PopularItems'
const Shops = lazy(()=>import('../../Components/Client/Shops'))

function ShopPage() {
  return (
    <div>
       <Header value={"/login"} user={true}/>
        <Layout>
        <Suspense fallback= {<div>Loading...</div>}>
        <Shops/>
        </Suspense>
        </Layout>
    </div>
  )
}

export default ShopPage
