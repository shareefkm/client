import React from 'react'
import Layout from '../../Layouts/Layout'
import Profile from '../../Components/Client/Profile'
import Header from '../../Layouts/Header/Header'

function UserProfile() {
  return (
    <div>
        <Header user={true}/>
      <Layout>
        <Profile/>
      </Layout>
    </div>
  )
}

export default UserProfile
