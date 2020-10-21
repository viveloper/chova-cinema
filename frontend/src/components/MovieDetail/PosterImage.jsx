import React from 'react';
import classes from './PosterImage.module.css';

const PosterImage = ({ posterUrl, width, height }) => {
  return (
    <img
      src={posterUrl}
      alt="poster"
      width={width}
      height={height}
      className={classes['poster-img']}
    />
  );
};

export default PosterImage;
