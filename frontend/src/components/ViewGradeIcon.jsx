import React from 'react';
import classes from './ViewGradeIcon.module.css';

const ViewGradeIcon = ({ size, color, text }) => {
  // if(parseInt(text) < 100){
  //   const fontSize = 13;
  // } else {
  //   const fontSize = 11;
  // }
  return (
    <div
      className={classes['view-grade']}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `${color}`,
      }}
    >
      <span
        className={classes['text']}
        style={{ fontSize: `${parseInt(text) < 100 ? '13' : '11'}px` }}
      >
        {text}
      </span>
    </div>
  );
};

export default ViewGradeIcon;
