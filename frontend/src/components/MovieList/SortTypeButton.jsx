import React from 'react';
import classes from './SortTypeButton.module.css';

const SortTypeButton = ({ type, name, active, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick(type);
  };
  return (
    <li className={classes['sort-type-btn']}>
      <a
        href="##"
        className={active ? classes['active'] : ''}
        onClick={handleClick}
      >
        {name}
      </a>
    </li>
  );
};

export default SortTypeButton;
