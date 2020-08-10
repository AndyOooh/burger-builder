import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/BackDrop/BackDrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {
  const backDropClass = props.showState
    ? [classes.SideDrawer, classes.Open]
    : [classes.SideDrawer, classes.Close];


  return (
    <Aux>
      <Backdrop showing={props.showState} clickBD={props.close} />
      <div className={backDropClass.join(' ')} onClick={props.close} >
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;