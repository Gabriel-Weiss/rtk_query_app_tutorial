import React, { useRef } from 'react'
import './Header.css'
import { GiFoodTruck } from "react-icons/gi";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiUpArrow } from "react-icons/bi";
import { Link } from 'react-router-dom';

const Header = () => {
  const navRef = useRef();

  const showHeader = () => {
    navRef.current.classList.toggle('responsive_nav')
  }

  return (
    <header>
      <h3><GiFoodTruck /></h3>
      <nav className="top_nav" ref={navRef}>
        <Link to={'/'}>Home</Link>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
        <button className='nav-btn nav-close-btn' onClick={showHeader}>
          <BiUpArrow />
        </button>
      </nav>
      <button className='nav-btn' onClick={showHeader}>
        <GiHamburgerMenu />
      </button>
    </header>
  )
}

export default Header