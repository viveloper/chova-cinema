import React from 'react';
import classes from './ListTypeButton.module.css';

const ListTypeButton = ({ type, name, active, onClick }) => {
  return (
    <button
      className={`${classes['btn-type']} ${active ? classes['active'] : ''}`}
      onClick={() => onClick(type)}
    >
      {name}
    </button>
  );
};

export default ListTypeButton;
