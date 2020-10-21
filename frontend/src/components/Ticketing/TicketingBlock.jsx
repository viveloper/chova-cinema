import React from 'react';
import classes from './TicketingBlock.module.css';

const TicketingBlock = ({ children }) => {
  return (
    <div className={classes['ticketing-block']}>
      <div className={classes['ticketing-center']}>{children}</div>
    </div>
  );
};

export default TicketingBlock;
