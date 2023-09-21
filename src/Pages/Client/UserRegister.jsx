import React from 'react'
import Register from '../../Components/Client/Register'

function UserRegister() {
  const user = true
  return (
    <div>
      <Register user={user}/>
    </div>
  )
}

export default UserRegister
