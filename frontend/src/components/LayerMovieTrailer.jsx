import React from 'react';
import classes from './LayerMovieTrailer.module.css';

const LayerMovieTrailer = ({ src, isActive, onClose }) => {
  if (isActive) {
    return (
      <div className={classes.layerMovieTrailer}>
        <div className={classes.centerContainer}>
          <div className={classes.layerPlayerContainer}>
            <div className={classes.playerHeader}>
              <button className={classes.closeBtn} onClick={onClose}>
                <span className={classes.icon}>
                  <i className="fas fa-times"></i>
                </span>
              </button>
            </div>
            <div className={classes.playerContent}>
              <video controls autoPlay>
                <source src={src} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default LayerMovieTrailer;
