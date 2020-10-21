import React from 'react';
import classes from './SummarySpecialScreen.module.css';

import specialScreens from '../../data/special.json';

const SummarySpecialScreen = ({ specialScreenDivisionCode }) => {
  return (
    <div className={classes['special-icons-container']}>
      {specialScreenDivisionCode.map((code) => {
        const special = specialScreens.Items.find(
          (specialScreen) => specialScreen.SpecialScreenDivisionCode === code
        );
        if (!special) return null;
        return (
          <span key={code} className={classes['special-icon']}>
            <img
              src={`${special.FilePath}${special.IconImageFileName}`}
              alt={special.SpecialScreenDivisionName}
              height="20"
            />
          </span>
        );
      })}
    </div>
  );
};

export default SummarySpecialScreen;
