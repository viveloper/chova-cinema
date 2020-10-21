import React from 'react';
import { Link } from 'react-router-dom';
import classes from './MovieCard.module.css';

const MovieCard = ({ movie, number, theme }) => {
  return (
    <div
      className={`${classes.card} ${theme === 'light' ? classes.light : ''}`}
    >
      <div className={classes.imgContainer}>
        <img src={movie.PosterURL} alt="poster" />
        <em className={classes.index}>{number}</em>
        <div className={classes.hoverLayer}>
          <Link to="/ticketing">예매하기</Link>
          <Link to={`/movieDetail/${movie.RepresentationMovieCode}`}>
            상세정보
          </Link>
        </div>
      </div>
      <div className={classes.info}>
        <p className={classes.title}>{movie.MovieNameKR}</p>
        <div className={classes.subInfo}>
          <span className={classes.rate}>
            예매율 {movie.BookingRate.toFixed(1)}%
          </span>
          {movie.DDay > 0 ? (
            <span className={classes.dday}>{`D-${movie.DDay}`}</span>
          ) : (
            <span className={classes.star}>
              <span className={classes.icon}>
                <i className="fas fa-star"></i>
              </span>{' '}
              <span>{movie.ViewEvaluation}</span>
            </span>
          )}
          <span className={classes.heart}>
            <i className="fab fa-gratipay"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
