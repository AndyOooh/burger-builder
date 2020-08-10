import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Aux/Aux'

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/' exact>Burger Builder</NavigationItem>
    
    {props.isAuthenticated ? 
    <Aux>
      <NavigationItem link='/orders'>Orders</NavigationItem>
      <NavigationItem link='/logout'>Logout</NavigationItem>
    </Aux> :
    <NavigationItem link='/auth'>Log In / Sign Up</NavigationItem> 
    }
  </ul>
);

export default navigationItems;
