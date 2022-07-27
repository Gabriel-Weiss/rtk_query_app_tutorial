import React from 'react'
import './Header.css';
import { MdOutlineNoFood } from "react-icons/md";
import { MdSearch } from "react-icons/md";
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
      <div className='header_search'>
        <input type="text" className="header_input" placeholder='Search' />
        <i className="search_icon" aria-hidden="true"><MdSearch /></i>
      </div>
    </div>
  )
}

export default Header