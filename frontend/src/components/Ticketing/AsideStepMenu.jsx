import React from 'react';
import classes from './AsideStepMenu.module.css';

const AsideStepMenu = ({ step, onClick }) => {
  return (
    <ul className={classes['aside-step-menu']}>
      <li
        className={`${classes['step']} ${step === 1 ? classes['active'] : ''} ${
          step > 1 ? classes['passed'] : ''
        }`}
        onClick={() => onClick(1)}
      >
        <span className={classes['number']}>01</span>
        <span className={classes['name']}>상영시간</span>
      </li>
      <li
        className={`${classes['step']} ${step === 2 ? classes['active'] : ''} ${
          step > 2 ? classes['passed'] : ''
        }`}
        onClick={() => onClick(2)}
      >
        <span className={classes['number']}>02</span>
        <span className={classes['name']}>인원/좌석</span>
      </li>
      <li
        className={`${classes['step']} ${step === 3 ? classes['active'] : ''} ${
          step > 3 ? classes['passed'] : ''
        }`}
        onClick={() => onClick(3)}
      >
        <span className={classes['number']}>03</span>
        <span className={classes['name']}>결제</span>
      </li>
      <li
        className={`${classes['step']} ${step === 4 ? classes['active'] : ''} ${
          step > 4 ? classes['passed'] : ''
        }`}
        onClick={() => onClick(4)}
      >
        <span className={classes['number']}>04</span>
        <span className={classes['name']}>결제완료</span>
      </li>
    </ul>
  );
};

export default AsideStepMenu;
