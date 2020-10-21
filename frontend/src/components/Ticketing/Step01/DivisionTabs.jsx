import React from 'react';
import classes from './DivisionTabs.module.css';

const DivisionTabs = ({ tab, onClick }) => {
  return (
    <div className={classes['tabs']}>
      <button
        className={`${classes['tab']} ${
          tab === 'all' ? classes['active'] : ''
        }`}
        onClick={() => onClick('all')}
      >
        전체
      </button>
      <button
        className={`${classes['tab']} ${
          tab === 'special' ? classes['active'] : ''
        }`}
        onClick={() => onClick('special')}
      >
        스페셜관
      </button>
    </div>
  );
};

export default DivisionTabs;
