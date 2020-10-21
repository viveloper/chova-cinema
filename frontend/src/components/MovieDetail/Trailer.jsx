import React, { useState } from 'react';
import classes from './Trailer.module.css';
import LayerMovieTrailer from '../LayerMovieTrailer';
import { useLayerMovieTrailer } from '../../customHooks';

const Trailer = ({ items }) => {
  const [startActiveIndex, setStartActiveIndex] = useState(0);

  const videoItems = items.filter(
    (item) => item.ImageDivisionCode === '2' && !!item.MediaURL
  );

  const handlePrevClick = () => {
    if (startActiveIndex === 0) return;
    setStartActiveIndex(startActiveIndex - 1);
  };

  const handleNextClick = () => {
    if (startActiveIndex + 3 === videoItems.length) return;
    setStartActiveIndex(startActiveIndex + 1);
  };

  const handleTrailerClick = (mediaUrl) => {
    handlePlay(mediaUrl);
  };

  const { src, isActive, handlePlay, handleClose } = useLayerMovieTrailer();

  return (
    <div className={classes['trailer-container']}>
      <div className={classes['header']}>
        <h4
          className={classes['title']}
        >{`트레일러 (${videoItems.length})`}</h4>
        <div className={classes['nav']}>
          <button onClick={handlePrevClick}>
            <i className="fas fa-angle-left"></i>
          </button>
          <button onClick={handleNextClick}>
            <i className="fas fa-angle-right"></i>
          </button>
        </div>
      </div>
      <ul
        className={classes['trailer']}
        style={{ transform: `translateX(${startActiveIndex * -333.5}px)` }}
      >
        {videoItems.map((item) => (
          <li
            key={item.MediaURL}
            className={classes['item']}
            onClick={() => handleTrailerClick(item.MediaURL)}
          >
            <img
              className={classes['media-image']}
              src={item.ImageURL}
              alt="trailer"
              width={313}
              height={193}
            />
            <p className={classes['media-title']}>{item.MediaTitle}</p>
          </li>
        ))}
      </ul>
      <LayerMovieTrailer src={src} isActive={isActive} onClose={handleClose} />
    </div>
  );
};

export default Trailer;
