import React from 'react';
import classes from './SortTypeButtons.module.css';

const SortTypeButtons = ({ children }) => {
  return <ul className={classes['sort-type-btns']}>{children}</ul>;
};

export default SortTypeButtons;
