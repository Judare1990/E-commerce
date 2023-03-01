import React from 'react'
import { Link } from 'react-router-dom'
import './style/header.css'

const handleClick = () => setIsClose(!isClose)

const Header = () => {
  return (
    <header className='header_links' >
        <h1 ><Link to='/'>Ecommerce</Link></h1>
        <nav >
          <i onClick={handleClick}></i>
            <ul>
                <li><Link to='/user/login'>Login</Link></li>
                <li><Link to='/purchases'>Purchases</Link></li>
                <li><Link to='/cart'>Cart</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header