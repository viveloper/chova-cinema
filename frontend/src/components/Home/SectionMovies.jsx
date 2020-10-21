import React from 'react';
import classes from './SectionMovies.module.css';

const SectionMovies = ({ children }) => {
  return (
    <section className={classes['section-movies']}>
      <div className="center">{children}</div>
    </section>
  );
};

export default SectionMovies;
