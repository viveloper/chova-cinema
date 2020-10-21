import React from 'react';
import classes from './SectionCinema.module.css';

const SectionCinema = ({ children }) => {
  return <section className={classes['section-cinema']}>{children}</section>;
};

export default SectionCinema;
