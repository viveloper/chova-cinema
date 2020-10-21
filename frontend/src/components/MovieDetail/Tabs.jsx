import React from 'react';
import classes from './Tabs.module.css';
import { numberWithCommas } from '../../util';

const Tabs = ({ activeTab, onTabClick, reviewCount }) => {
  return (
    <div className={classes['tabs']}>
      <button
        className={`${classes['tab']} ${
          activeTab === 'info' ? classes['active'] : ''
        }`}
        onClick={() => onTabClick('info')}
      >
        영화정보
      </button>
      <button
        className={`${classes['tab']} ${
          activeTab === 'review' ? classes['active'] : ''
        }`}
        onClick={() => onTabClick('review')}
      >
        {`평점 및 관람평 (${numberWithCommas(reviewCount)})`}
      </button>
    </div>
  );
};

export default Tabs;
