import React from 'react';
import classes from './DivisionList.module.css';

const DivisionList = ({
  divisions,
  tab,
  detailDivisionCode,
  onDivisionClick,
}) => {
  const handleDivisionClick = (e, code) => {
    e.preventDefault();
    onDivisionClick(code);
  };
  return (
    <ul className={classes['division-list']}>
      {divisions
        .filter((division) =>
          tab === 'all'
            ? division.DivisionCode === 1
            : division.DivisionCode === 2
        )
        .map((division) => (
          <li
            key={division.DetailDivisionCode}
            className={`${classes['division']} ${
              division.DetailDivisionCode === detailDivisionCode
                ? classes['active']
                : ''
            }`}
          >
            <a
              href="##"
              className={classes['division-name']}
              onClick={(e) =>
                handleDivisionClick(e, division.DetailDivisionCode)
              }
            >
              {division.GroupNameKR}
              <span
                className={classes['cinema-count']}
              >{`(${division.CinemaCount})`}</span>
              <span className={classes['check-icon']}>
                <i className="fas fa-check"></i>
              </span>
            </a>
          </li>
        ))}
    </ul>
  );
};

export default DivisionList;
