import React from 'react'
import { Link } from 'react-router-dom'
import './style/header.css'


const Header = () => {
  return (
    <header className='header_container' >
        <h1 className='header_title_container'><Link className='header_title' to='/'>Ecommerce</Link></h1>
        <nav className='header_nav'>
            <ul className='header_link-container'>
                <li><Link className='header_links' to='/user/login'>Login</Link></li>
                <li><Link className='header_links' to='/purchases'>Purchases</Link></li>
                <li><Link className='header_links' to='/cart'>Cart</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header