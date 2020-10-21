import React from 'react';
import classes from './SectionTitle.module.css';

const SectionTitle = ({ title }) => {
  return <h4 className={classes['title']}>{title}</h4>;
};

export default SectionTitle;
