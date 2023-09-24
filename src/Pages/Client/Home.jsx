import React from 'react'
import Header from '../../Layouts/Header/Header'
import Banner from '../../Components/Client/Banner'
import Layout from '../../Layouts/Layout'
import PopularItems from '../../Components/Client/PopularItems'

function Home() {
  return (
    <div>
        <Header value={"/login"} user={true}/>
        <Layout>
        <Banner/>
        <PopularItems/>
        </Layout>
    </div>
  )
}

export default Home
