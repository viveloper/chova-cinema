import React, { useState } from 'react';
import classes from './Poster.module.css';

const Poster = ({ items }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const SMALL_IMAGE_WIDTH = 225;
  const LARGE_IMAGE_WIDTH = 766;

  const imageItems = items.filter(
    (item) => item.ImageDivisionCode === '1' && !!item.ImageURL
  );

  const handleLeftClick = () => {
    if (activeImageIndex === 0) {
      setActiveImageIndex(imageItems.length - 1);
    } else {
      setActiveImageIndex(activeImageIndex - 1);
    }
  };

  const handleRightClick = () => {
    if (activeImageIndex === imageItems.length - 1) {
      setActiveImageIndex(0);
    } else {
      setActiveImageIndex(activeImageIndex + 1);
    }
  };

  return (
    <div className={classes['poster']}>
      <h4
        className={classes['title']}
      >{`포스터 & 스틸컷 (${imageItems.length})`}</h4>
      <div className={classes['small-trailer']}>
        <button onClick={handleLeftClick}>
          <i className="fas fa-angle-left"></i>
        </button>
        <div className={classes['items-container']}>
          <ul
            className={classes['items']}
            style={{
              transform: `translateX(${
                activeImageIndex * SMALL_IMAGE_WIDTH * -1
              }px)`,
            }}
          >
            {imageItems.map((item) => (
              <li key={item.ImageURL} className={classes['item']}>
                <img
                  src={item.ImageURL}
                  alt="poster"
                  width={SMALL_IMAGE_WIDTH}
                  height={150}
                />
              </li>
            ))}
          </ul>
        </div>
        <button onClick={handleRightClick}>
          <i className="fas fa-angle-right"></i>
        </button>
      </div>
      <div className={classes['large-trailer']}>
        <button onClick={handleLeftClick}>
          <i className="fas fa-angle-left"></i>
        </button>
        <div className={classes['items-container']}>
          <ul
            className={classes['items']}
            style={{
              transform: `translateX(${
                activeImageIndex * LARGE_IMAGE_WIDTH * -1
              }px)`,
            }}
          >
            {imageItems.map((item) => (
              <li key={item.ImageURL} className={classes['item']}>
                <img
                  src={item.ImageURL}
                  alt="poster"
                  width={LARGE_IMAGE_WIDTH}
                  height={510}
                />
              </li>
            ))}
          </ul>
        </div>
        <button onClick={handleRightClick}>
          <i className="fas fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Poster;
