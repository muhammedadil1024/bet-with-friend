import React from 'react'
import logo from '../../assets/logo_frame.png'
import "../../App.css";

const Header = () => {
  return (
    <div className='header'>
      <img src={logo} alt="bwf logo" />
    </div>
  )
}

export default Header