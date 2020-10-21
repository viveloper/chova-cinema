import React from 'react';
import MovieCard from '../MovieCard';
import classes from './List.module.css';

const List = ({ movies }) => {
  return (
    <ul className={classes['list']}>
      {movies.map((movie, index) => (
        <li key={movie.RepresentationMovieCode} className={classes['item']}>
          <MovieCard movie={movie} number={index + 1} theme="light" />
        </li>
      ))}
    </ul>
  );
};

export default List;
