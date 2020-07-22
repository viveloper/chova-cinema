import React, { useState } from 'react';
import classes from './ReviewBox.module.css';

const ReviewBox = ({ onReviewSubmit }) => {
  const [score, setScore] = useState(10);
  const [text, setText] = useState('');

  const MAX_TEXT_LEN = 220;

  const handleStarOver = (score) => {
    setScore(score);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleReviewSubmit = () => {
    onReviewSubmit({
      reviewText: text,
      evaluation: score,
    });
  };

  return (
    <div className={classes['review-box']}>
      <div className={classes['score-box']}>
        <span className={classes['text-score']}>
          <span className={classes['score']}>{score}</span> 점
        </span>
        <div className={classes['star-score']}>
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <span
                key={index}
                className={classes['icon-star']}
                onMouseOver={() => handleStarOver(index + 1)}
                style={{
                  color: `${index < score ? 'orange' : '#ccc'}`,
                }}
              >
                <i className="fas fa-star"></i>
              </span>
            ))}
        </div>
      </div>
      <div className={classes['text-box']}>
        <textarea
          value={text}
          onChange={handleTextChange}
          maxLength={MAX_TEXT_LEN}
          placeholder="평점 및 영화 관람평을 작성해주세요."
        ></textarea>
        <span className={classes['text-count-container']}>
          <span className={classes['count']}>{text.length}</span>
          {` / ${MAX_TEXT_LEN}`}
        </span>
      </div>
      <button className={classes['btn-write']} onClick={handleReviewSubmit}>
        관람평 작성
      </button>
    </div>
  );
};

export default ReviewBox;
