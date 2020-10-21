import React from 'react';
import classes from './ScoreBox.module.css';

const ScoreBox = ({ score }) => {
  return (
    <div className={classes['score-box']}>
      <div className={classes['score']}>
        <span className={classes['text']}>총 평점</span>
        <span className={classes['icon-star']}>
          <i className="fas fa-star"></i>
        </span>
        <span className={classes['avg']}>{score}</span>
        <span className={classes['slash']}>/</span>
        <span className={classes['max']}>10</span>
      </div>
      <p className={classes['info']}>
        영화 관람 후 관람평을 작성하시면 <br />
        L.POINT 50P를 적립해 드립니다.
      </p>
    </div>
  );
};

export default ScoreBox;
