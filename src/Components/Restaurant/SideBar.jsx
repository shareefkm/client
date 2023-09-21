import React from 'react'
import Button from '../../assets/Button'
import Header from '../../Components/Client/Header'

function SideBar() {
  return (
    <div>
      <div>
        <div>
        <span className="text-3xl font-bold text-purple font-lobster">Yummi</span>
        </div>
        <Button value={"Profile"}/>
        <Button value={"Add"}/>
        <Button value={"Orders"}/>
        <Button value={"Profile"}/>
        <Button value={"Profile"}/>
      </div>
    </div>
  )
}

export default SideBar
