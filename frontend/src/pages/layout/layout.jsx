import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Searchbox from "../../components/SearchBox";

import './Layout.css'

function Layout({ name }) {
  const clearToken = () => {
    fetch('/signout')
      .then(() => window.location.reload());
  };

  return (
    <>
      <header id="top-bar">
        <Link to='/' draggable='false'><h1>TODOapp</h1></Link>
        <div className='user' onClick={clearToken}>
          <p>{name}</p>
        </div>
      </header>
      <Searchbox key='searchbox' />
      <Outlet />
    </>
  );
};
export default Layout