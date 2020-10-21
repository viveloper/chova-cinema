import React from 'react';
import classes from './FilteringTabs.module.css';
const FilteringTabs = ({ tab, onClick }) => {
  return (
    <div className={classes['filtering-tabs']}>
      <button
        className={
          tab === 'all'
            ? `${classes['btn-tab']} ${classes['active']}`
            : classes['btn-tab']
        }
        onClick={() => onClick('all')}
      >
        전체
      </button>
      <button
        className={
          tab === 'special'
            ? `${classes['btn-tab']} ${classes['active']}`
            : classes['btn-tab']
        }
        onClick={() => onClick('special')}
      >
        스페셜관
      </button>
    </div>
  );
};

export default FilteringTabs;
