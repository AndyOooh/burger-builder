import React, { Component } from 'react';
import classes from './Model.module.css';
import Aux from '../../../hoc/Aux/Aux';
import BackDrop from '../BackDrop/BackDrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }

  render() {
    return (
      <Aux>
        <BackDrop showing={this.props.show} clickBD={this.props.closeModal} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '0.9' : '0',
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
