import React from 'react';
import classes from './CinemaList.module.css';

const CinemaList = ({ cinemas, cinemaId, onCinemaClick }) => {
  const handleCinemaClick = (e, code) => {
    e.preventDefault();
    onCinemaClick(code);
  };
  return (
    <ul className={classes['cinema-list']}>
      {cinemas.map((cinema) => (
        <li
          key={cinema.CinemaID}
          className={`${classes['cinema']} ${
            cinema.CinemaID === cinemaId ? classes['active'] : ''
          }`}
        >
          <a
            href="##"
            className={classes['cinema-name']}
            onClick={(e) => handleCinemaClick(e, cinema.CinemaID)}
          >
            {cinema.CinemaNameKR}
            <span className={classes['check-icon']}>
              <i className="fas fa-check"></i>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default CinemaList;
