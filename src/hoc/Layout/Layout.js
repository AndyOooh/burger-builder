import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSidedrawer: false,
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSidedrawer: !prevState.showSidedrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar isAuth={this.props.isAuthenticated} showMenu={this.sideDrawerToggleHandler} />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          showState={this.state.showSidedrawer}
          close={this.sideDrawerToggleHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
