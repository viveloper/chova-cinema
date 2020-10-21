import React from 'react';
import classes from './DetailInfo.module.css';

const DetailInfo = ({ children }) => {
  return (
    <section className={classes['detail-info']}>
      <div className="center">{children}</div>
    </section>
  );
};

export default DetailInfo;
