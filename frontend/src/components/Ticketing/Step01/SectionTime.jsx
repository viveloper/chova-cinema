import React from 'react';
import classes from './SectionTime.module.css';

const SectionTime = ({ children }) => {
  return <section className={classes['section-time']}>{children}</section>;
};

export default SectionTime;
