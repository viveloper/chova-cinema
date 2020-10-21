import React from 'react';
import classes from './Articles.module.css';

const Articles = ({ children }) => {
  return <div className={classes['articles']}>{children}</div>;
};

export default Articles;
