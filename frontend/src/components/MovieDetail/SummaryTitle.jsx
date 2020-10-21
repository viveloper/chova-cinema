import React from 'react';

import ViewGradeIcon from '../ViewGradeIcon';

import classes from './SummaryTitle.module.css';

import { getViewGradeIconOptions } from '../../util';

const SummaryTitle = ({ viewGradeCode, movieName }) => {
  const viewGradeIconOptions = getViewGradeIconOptions(viewGradeCode);
  return (
    <div className={classes['title']}>
      <ViewGradeIcon
        size={36}
        color={viewGradeIconOptions.color}
        text={viewGradeIconOptions.text}
      />
      <span className={classes['text']}>{movieName}</span>
    </div>
  );
};

export default SummaryTitle;
