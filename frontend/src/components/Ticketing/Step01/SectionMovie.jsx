import React from 'react';
import classes from './SectionMovie.module.css';

const SectionMovie = ({ children }) => {
  return <section className={classes['section-movie']}>{children}</section>;
};

export default SectionMovie;
