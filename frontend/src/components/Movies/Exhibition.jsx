import React from 'react';
import MovieCardList from '../MovieCardList';
import classes from './Exhibition.module.css';

const Exhibition = ({ type, title, subTitle, linkName, movies }) => {
  const backgroundUrl = getBackgroundUrl(type);
  const fontColor = getFontColor(type);

  return (
    <div
      className={classes['exhibition']}
      style={{ background: `url('${backgroundUrl}') no-repeat 0 0` }}
    >
      <div className={classes.info} style={{ color: fontColor }}>
        <div className={classes.description}>
          {subTitle}
          <br />
          {title}
        </div>
        <a href="##" style={{ color: fontColor }}>
          {linkName ? linkName + ' >' : ''}
        </a>
      </div>
      {movies && movies.length > 0 ? (
        <MovieCardList movies={movies} activeNum={1} theme="light" />
      ) : (
        <div className={classes.commingSoon}>
          <div>comming soon</div>
          <span>준비중입니다.</span>
        </div>
      )}
    </div>
  );
};

const getBackgroundUrl = (type) => {
  if (type === 'arte') {
    return '/img/exhibition/bg_exhib_01.png';
  } else if (type === 'opera') {
    return '/img/exhibition/bg_exhib_02.png';
  } else if (type === 'festival') {
    return '/img/exhibition/bg_exhib_03.png';
  } else {
    return '';
  }
};

const getFontColor = (type) => {
  if (type === 'arte') {
    return '#000';
  } else {
    return '#fff';
  }
};

export default Exhibition;
