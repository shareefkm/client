import React from 'react'
import Login from '../../Components/Client/Login'

function UserLogin() {
  const user = true
  return (
    <div>
      <Login user={user}/>
    </div>
  )
}

export default UserLogin
