import React from 'react';
import classes from './MoreButton.module.css';

const MoreButton = ({ onClick }) => {
  return (
    <button className={classes['btn-more']} onClick={onClick}>
      펼쳐보기 <i className="fas fa-angle-down"></i>
    </button>
  );
};

export default MoreButton;
