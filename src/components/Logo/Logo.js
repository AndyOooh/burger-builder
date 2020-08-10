import React from 'react';
import burgerLogo from '../../assets/images/original.png';
import classes from './Logo.module.css'

const logo = (props) =>  (
    <div className={classes.Logo} >
      <img src={burgerLogo} alt='burger logo' />
    </div>
  );

export default logo;