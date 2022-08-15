import React from 'react'
import './css/Header.css';
import { MdOutlineNoFood } from "react-icons/md";
import { Link } from 'react-router-dom';

const Header = () => {

  return (
    <div className='header_container'>
      <div className='header_icon'><MdOutlineNoFood /></div>
      <ul className="header_nav">
        <Link className='list_item' to={'/'} > Home    </Link>
        <Link className='list_item' to={'/'} > News    </Link>
        <Link className='list_item' to={'/'} > Contact </Link>
        <Link className='list_item' to={'/'} > About   </Link>
      </ul>
    </div>
  )
}

export default Header