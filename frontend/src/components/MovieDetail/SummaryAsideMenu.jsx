import React from 'react';
import classes from './SummaryAsideMenu.module.css';
import { numberWithCommas } from '../../util';

const SummaryAsideMenu = ({ likeCount, onTicketingClick }) => {
  return (
    <div className={classes['aside-menu']}>
      <button className={classes['btn-link']}>
        <i className="fas fa-share-alt"></i>
      </button>
      <button className={classes['btn-like']}>
        <i className="far fa-heart"></i>
        <span className={classes['like-cnt']}>
          {numberWithCommas(likeCount)}
        </span>
      </button>
      <button className={classes['btn-ticketing']} onClick={onTicketingClick}>
        예매하기
      </button>
    </div>
  );
};

export default SummaryAsideMenu;
