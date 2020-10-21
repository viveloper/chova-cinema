import React from 'react';
import classes from './Preference.module.css';

const Preference = ({ children }) => {
  return (
    <article className={classes['preference']}>
      <h4 className={classes['title']}>관람 선호도</h4>
      <div className={classes['prefer-group']}>{children}</div>
    </article>
  );
};

export default Preference;
