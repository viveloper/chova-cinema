import React, { useState, useEffect } from 'react';
import classes from './Carousel.module.css';
import LayerMovieTrailer from './LayerMovieTrailer';
import { useLayerMovieTrailer } from '../customHooks';

const Carousel = ({ theme, height, width, items }) => {
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  });

  const handlePrevClick = () => {
    const prevIndex =
      (activeItem - 1 < 0 ? items.length + (activeItem - 1) : activeItem - 1) %
      items.length;
    setActiveItem(prevIndex);
  };

  const handleNextClick = () => {
    const nextIndex = (activeItem + 1) % items.length;
    setActiveItem(nextIndex);
  };

  const handleImgClick = (e, index) => {
    e.preventDefault();
    handlePlay(items[index].video);
  };

  const { src, isActive, handlePlay, handleClose } = useLayerMovieTrailer();

  return (
    <div
      className={`${classes.carousel} ${
        theme === 'dark' ? `${classes.dark}` : ''
      }`}
    >
      <div className={classes.container}>
        <ul
          className={classes.items}
          style={{ transform: `translateX(${activeItem * -100}%)` }}
        >
          {items.map((item, index) => (
            <li
              key={item.img}
              className={`${classes.item} ${
                item.video ? classes.playable : ''
              }`}
            >
              <a href="#play" onClick={(e) => handleImgClick(e, index)}>
                <div
                  className={classes.imgContainer}
                  style={{
                    width: `${width ? `${width}px` : 'auto'}`,
                    height: `${height ? `${height}px` : 'auto'}`,
                  }}
                >
                  <img src={item.img} alt="poster" height={height} />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <button
        className={`${classes.btnNav} ${classes.btnNavPrev}`}
        onClick={handlePrevClick}
      >
        <span className={classes.prev}>
          <i className="fas fa-angle-left fa-4x"></i>
        </span>
      </button>
      <button
        className={`${classes.btnNav} ${classes.btnNavNext}`}
        onClick={handleNextClick}
      >
        <span className={classes.next}>
          <i className="fas fa-angle-right fa-4x"></i>
        </span>
      </button>

      <LayerMovieTrailer src={src} isActive={isActive} onClose={handleClose} />
    </div>
  );
};

export default Carousel;
