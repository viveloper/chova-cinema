import React from 'react';
import classes from './Divisions.module.css';

const Divisions = ({ children }) => {
  return <div className={classes['divisions']}>{children}</div>;
};

export default Divisions;
