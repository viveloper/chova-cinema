import React, { useEffect } from 'react';
import MoreButton from '../MoreButton';
import classes from './ReviewList.module.css';
import { numberWithCommas } from '../../util';
import { useSelector } from 'react-redux';

const ReviewList = ({
  reviewList,
  likedReviewList,
  totalCount,
  sortType,
  movieReviewError,
  onMoreClick,
  onSortClick,
  onDelete,
  onEdit,
  onReviewRecommendClick,
}) => {
  const userReviewIds = useSelector((state) =>
    state.login.data ? state.login.data.user.reviewList : []
  );

  useEffect(() => {
    if (movieReviewError) alert(movieReviewError);
  }, [movieReviewError]);

  return (
    <div className={classes['review-list']}>
      <div className={classes['header']}>
        <span className={classes['total']}>{`총 ${numberWithCommas(
          totalCount
        )}건`}</span>
        <div>
          <button
            className={sortType === 'recent' ? classes['active'] : ''}
            onClick={() => onSortClick('recent')}
          >
            최신순
          </button>
          <button
            className={sortType === 'like' ? classes['active'] : ''}
            onClick={() => onSortClick('like')}
          >
            공감순
          </button>
        </div>
      </div>
      <ul className={classes['items']}>
        {reviewList.map((item) => {
          let iconUrl = '';
          if (item.Evaluation >= 9) {
            iconUrl = '/img/icons/ic_survey_01.png';
          } else if (item.Evaluation >= 7) {
            iconUrl = '/img/icons/ic_survey_02.png';
          } else if (item.Evaluation >= 5) {
            iconUrl = '/img/icons/ic_survey_03.png';
          } else if (item.Evaluation >= 3) {
            iconUrl = '/img/icons/ic_survey_04.png';
          } else {
            iconUrl = '/img/icons/ic_survey_05.png';
          }
          const anonymizedName = item.MemberName.split('').reduce(
            (name, character, index, arr) =>
              index === 0 || index === arr.length - 1
                ? name + character
                : name + '*',
            ''
          );
          const isOwn = userReviewIds.includes(item.ReviewID);
          return (
            <li
              key={item.ReviewID}
              className={
                isOwn ? `${classes['item']} ${classes['own']}` : classes['item']
              }
            >
              <img src={iconUrl} alt="icon" width="42" height="42" />
              <div className={classes['top-info']}>
                <span className={classes['name']}>{anonymizedName}</span>
                <span className={classes['score']}>
                  <span className={classes['icon-star']}>
                    <i className="fas fa-star"></i>
                  </span>
                  {item.Evaluation}
                </span>
              </div>
              <p className={classes['review-info']}>{item.ReviewText}</p>
              <div className={classes['bottom-info']}>
                <span className={classes['date']}>{item.RegistDate}</span>
                <span
                  className={classes['recommend']}
                  onClick={() => onReviewRecommendClick(item.ReviewID)}
                >
                  <span
                    className={
                      likedReviewList.includes(item.ReviewID)
                        ? `${classes['icon-thumbs-up']} ${classes['liked']}`
                        : classes['icon-thumbs-up']
                    }
                  >
                    <i className="far fa-thumbs-up"></i>
                  </span>
                  {item.RecommandCount}
                </span>
              </div>
              {isOwn ? (
                <div className={classes['user-control']}>
                  <button
                    className={classes['edit']}
                    onClick={() => onEdit(item.ReviewID)}
                  >
                    수정
                  </button>
                  <button
                    className={classes['delete']}
                    onClick={() => onDelete(item.ReviewID)}
                  >
                    삭제
                  </button>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>

      {reviewList.length < totalCount ? (
        <MoreButton onClick={onMoreClick} />
      ) : null}
    </div>
  );
};

export default React.memo(ReviewList);
