import React from 'react';
import classes from './SectionTop5Movies.module.css';

const SectionTop5Movies = ({ children }) => {
  return (
    <section className={classes['section-top5-movies']}>{children}</section>
  );
};

export default SectionTop5Movies;
