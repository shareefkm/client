import React from 'react'
import Header from '../../Components/Client/Header'
import Navbar from '../../Components/Client/Navbar'
import Banner from '../../Components/Client/Banner'

function Home() {
  return (
    <div>
        <Header value={"/login"} user={true}/>
        <Navbar/>
        <Banner/>
    </div>
  )
}

export default Home
