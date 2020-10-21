import React from 'react';

import classes from './SummaryInfo.module.css';

const SummaryInfo = ({ children }) => {
  return <div className={classes['summary-info']}>{children}</div>;
};

export default SummaryInfo;
