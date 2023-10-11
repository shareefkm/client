import React, {lazy, Suspense} from 'react'
import Layout from '../../Layouts/Layout'
// import Profile from '../../Components/Client/Profile'
import Header from '../../Layouts/Header/Header'
const Profile = lazy(()=>import('../../Components/Client/Profile'))

function UserProfile() {
  return (
    <div>
        <Header user={true}/>
      <Layout>
      <Suspense fallback= {<div>Loading...</div>}>
        <Profile/>
        </Suspense>
      </Layout>
    </div>
  )
}

export default UserProfile
