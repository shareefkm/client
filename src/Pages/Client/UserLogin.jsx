import React from 'react'
import Login from '../../Components/Login'
import Layout from '../../Layouts/Layout'

function UserLogin() {
  const user = true
  return (
    <div>
      <Layout>
      <Login user={user}/>
      </Layout>
    </div>
  )
}

export default UserLogin
