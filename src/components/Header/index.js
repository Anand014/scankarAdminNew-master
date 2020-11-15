import React from 'react';
import { NavLink, Link, Redirect,useHistory } from 'react-router-dom';
import myApp from '../../FirebaseConfig.js';
import './index.scss';

const Header = () => {

  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }
  return (
    <header className='header'>
      <h1 className='Logo'>
        <Link to='/'>Logo</Link>
      </h1>
      <nav>
        <ul className='nav_links'>
          <li>
            <NavLink to='/' exact activeClassName='is-active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/map' activeClassName='is-active'>
              Live map
            </NavLink>
          </li>
          <li>
            <NavLink to='/graph' activeClassName='is-active'>
              Graph
            </NavLink>
          </li>
        </ul>
      </nav>
      <button className='cta' onClick={() => {

        history.push("/home")
        myApp.auth().signOut()
        
      }}>
        Sign out
      </button>
    </header>
  );
};

export default Header;
