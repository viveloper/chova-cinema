import React from 'react';

import classes from './Summary.module.css';

const Summary = ({ children }) => {
  return (
    <section className={classes['summary']}>
      <div className={`center ${classes['summary-container']}`}>{children}</div>
    </section>
  );
};

export default Summary;
