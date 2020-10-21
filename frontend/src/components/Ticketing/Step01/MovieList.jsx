import React from 'react';
import ViewGradeIcon from '../../ViewGradeIcon';
import classes from './MovieList.module.css';

import { getViewGradeIconOptions } from '../../../util';

const MovieList = ({
  movies,
  sortType,
  viewType,
  selectedMovieCode,
  onMovieClick,
}) => {
  const handleMovieClick = (e, code) => {
    e.preventDefault();
    onMovieClick(code);
  };

  const sortedMovies = sortMovies([...movies], sortType);

  return (
    <ul className={classes['movie-list']}>
      {sortedMovies.map((movie, index) => {
        const viewGradeIconOptions = getViewGradeIconOptions(
          movie.ViewGradeCode
        );
        if (viewType === 'text') {
          return (
            <li
              key={movie.RepresentationMovieCode}
              className={`${classes['movie-item']} ${classes['text-type']} ${
                selectedMovieCode === movie.RepresentationMovieCode
                  ? classes['active']
                  : ''
              }`}
            >
              <a
                href="##"
                onClick={(e) =>
                  handleMovieClick(e, movie.RepresentationMovieCode)
                }
              >
                <ViewGradeIcon
                  size={22}
                  color={viewGradeIconOptions.color}
                  text={viewGradeIconOptions.text}
                />
                <span className={classes['movie-name']}>
                  {movie.MovieNameKR}
                </span>

                <span className={classes['check-icon']}>
                  <i className="fas fa-check"></i>
                </span>
              </a>
            </li>
          );
        } else {
          return (
            <li
              key={movie.RepresentationMovieCode}
              className={`${classes['movie-item']} ${
                classes['thumbnail-type']
              } ${
                selectedMovieCode === movie.RepresentationMovieCode
                  ? classes['active']
                  : ''
              }`}
            >
              <a
                href="##"
                onClick={(e) =>
                  handleMovieClick(e, movie.RepresentationMovieCode)
                }
              >
                <div className={classes['movie-poster']}>
                  <img src={movie.PosterURL} alt="poster" />
                  <em className={classes['index']}>{index + 1}</em>
                </div>
                <div className={classes['movie-info']}>
                  <div className={classes['title']}>
                    <ViewGradeIcon
                      size={22}
                      color={viewGradeIconOptions.color}
                      text={viewGradeIconOptions.text}
                    />
                    <span className={classes['movie-name']}>
                      {movie.MovieNameKR}
                    </span>
                    <span className={classes['check-icon']}>
                      <i className="fas fa-check"></i>
                    </span>
                  </div>
                  <div className={classes['detail-info']}>
                    <div className={classes['row']}>
                      <span className={classes['text']}>예매율</span>
                      <span
                        className={classes['value']}
                      >{`${movie.BookingRate.toFixed(1)}%`}</span>
                      <span className={classes['star']}>
                        <i className="fas fa-star"></i>
                      </span>
                      <span className={classes['value']}>
                        {movie.ViewEvaluation}
                      </span>
                    </div>
                    <div className={classes['row']}>
                      <span className={classes['text']}>개봉일</span>
                      <span className={classes['value']}>{`${
                        movie.ReleaseDate.split(' ')[0].split('-')[0]
                      }.${movie.ReleaseDate.split(' ')[0].split('-')[1]}.${
                        movie.ReleaseDate.split(' ')[0].split('-')[2]
                      }`}</span>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          );
        }
      })}
    </ul>
  );
};

const sortMovies = (movies, sortType) => {
  if (sortType === 'A') {
    return movies.sort((a, b) => b.BookingRate - a.BookingRate);
  } else if (sortType === 'B') {
    return movies.sort((a, b) => b.KOFCustCnt - a.KOFCustCnt);
  } else if (sortType === 'C') {
    return movies.sort((a, b) => b.ViewEvaluation - a.ViewEvaluation);
  } else if (sortType === 'D') {
    return movies.filter((movie) => parseInt(movie.DDay) > 0);
  } else {
    return movies;
  }
};

export default MovieList;
