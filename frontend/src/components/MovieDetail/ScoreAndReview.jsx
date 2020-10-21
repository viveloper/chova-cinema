import React from 'react';
import classes from './ScoreAndReview.module.css';

const ScoreAndReview = ({ children }) => {
  return <div className={classes['movie-review']}>{children}</div>;
};

export default ScoreAndReview;
