import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

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
      path: '/restaurant',
      display: 'Become a Partner',
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
      path: '/',
      display: 'Contact',
    },
  ];

  return (
    <div className="navbar bg-base-100 shadow-md">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {nav_titles.map((title, index) => (
            <li key={index} className="font-semibold my-2 md:my-0 md:ml-8 cursor-pointer">
              <Link to={title.path}>{title.display}</Link>
            </li>
          ))}
      </ul>
    </div>
    <span className="text-3xl font-bold text-purple font-lobster">Yummi</span>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {nav_titles.map((title, index) => (
            <li tabIndex={0} key={index} className="font-semibold my-7 md:my-0 md:ml-8 cursor-pointer">
              <Link to={title.path}>{title.display}</Link>
            </li>
          ))}
    </ul>
  </div>
</div>
  );
}

export default Navbar;
