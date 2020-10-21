import React from 'react';
import classes from './SectionMovieList.module.css';

const SectionMovieList = ({ children }) => {
  return (
    <section className={classes['section-movie-list']}>
      <div className="center">{children}</div>
    </section>
  );
};

export default SectionMovieList;
