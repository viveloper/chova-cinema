import React from 'react';
import classes from './ExhibitionList.module.css';

const ExhibitionList = ({ children }) => {
  return (
    <div className={`center ${classes['exhibitionList']}`}>{children}</div>
  );
};

export default ExhibitionList;
