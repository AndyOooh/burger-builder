import React, { useState } from 'react';
import { connect } from 'react-redux';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
  const [showSidedrawer, setShowSidedrawer] = useState(false);

  const sideDrawerToggleHandler = () => {
    setShowSidedrawer(!showSidedrawer);
  };

  return (
    <Aux>
      <Toolbar isAuth={props.isAuthenticated} showMenu={sideDrawerToggleHandler} />
      <SideDrawer
        isAuth={props.isAuthenticated}
        showState={showSidedrawer}
        close={sideDrawerToggleHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
