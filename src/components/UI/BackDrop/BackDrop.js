import React from 'react';
import classes from './BackDrop.module.css';

const backDrop = (props) => (
  <div>
    {props.showing ? <div className={classes.Backdrop} onClick={props.clickBD} /> : null}
  </div>
);

export default backDrop;
