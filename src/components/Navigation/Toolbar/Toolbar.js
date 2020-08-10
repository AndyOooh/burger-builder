import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle toggle={props.showMenu} />
    {/* <div onClick={props.showMenu}>MENU</div> */}
    <div className={classes.Logo} >
      <Logo />
    </div>
    <nav className={classes.DesktopOnly} >
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;