import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './Navbar.css'

function Navbar() {

  const user = useSelector((state) => {
    return state.user
  });

  const nav_titles = [
    {
      path: '/',
      display: 'Home',
    },
    {
      path: '/shops',
      display: 'Restaurant',
    },
    
    {
      path: '/',
      display: 'Offers',
    },
    {
      path: '/',
      display: 'About us',
    },
    {
      path: user.token ? '/chat' : '/',
      display: user.token ? 'Chat' : 'Contact',
    },
    user.token
    ? {
        path: '/profile',
        display: 'Profile',
      }
    : {
        path: '/restaurant',
        display: 'Become a Partner',
      },
      !user.token ?
      {
        path: '/employee',
        display: 'Join with us',
      }
      : {
        path: '/orders',
        display: 'Orders',
      }
  ];

  return (
    <div className="navbar bg-cherry-Red shadow-lg">
  <div className="navbar-start">
    <div className="dropdown ">
      <label tabIndex={0} className="btn btn-ghost lg:hidden" onClick={e => e.currentTarget.nextElementSibling.classList.toggle('hidden')}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu-md dropdown-content mt-3 z-[1] p-2 shadow w-52  bg-gray-800 text-off-White">
        {nav_titles.map((title, index) => (
            <li key={index} className="font-semibold my-2 cursor-pointer ">
              <Link className='hover:bg-transparent hover:text-off-White' to={title.path}>{title.display}</Link>
            </li>
          ))}
      </ul>
    </div>
    <span className="text-3xl font-bold text-off-White font-lobster">Yummi</span>
  </div>
  <div className="navbar-center hidden lg:flex ">
    <ul className="menu menu-horizontal px-1 ">
      {nav_titles.map((title, index) => (
            <li tabIndex={0} key={index} className="font-semibold my-7 lg:my-0 lg:ml-8 cursor-pointer text-off-White text-base">
              <Link className='hover:bg-transparent hover:text-off-White' to={title.path}>{title.display}</Link>
            </li>
          ))}
    </ul>
  </div>
</div>
  );
}

export default Navbar;
