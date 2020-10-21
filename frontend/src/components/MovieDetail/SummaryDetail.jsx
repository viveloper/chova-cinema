import React from 'react';
import classes from './SummaryDetail.module.css';

const SummaryDetail = ({ movieDetail }) => {
  return (
    <ul className={classes['detail-info']}>
      <li>
        <span className={classes['detail-info-type']}>장르</span>
        <span
          className={classes['detail-info-value']}
        >{`${movieDetail.Movie.MovieGenreNameKR}, ${movieDetail.Movie.MovieGenreNameKR2} / ${movieDetail.Movie.MakingNationNameKR}`}</span>
        <span
          className={`${classes['detail-info-value']} ${classes['separator']}`}
        >{`${movieDetail.Movie.ReleaseDate.split(' ')[0].split('-')[0]}.${
          movieDetail.Movie.ReleaseDate.split(' ')[0].split('-')[1]
        }.${
          movieDetail.Movie.ReleaseDate.split(' ')[0].split('-')[2]
        } 개봉`}</span>
        <span
          className={`${classes['detail-info-value']} ${classes['separator']}`}
        >{`${movieDetail.Movie.PlayTime}분`}</span>
      </li>
      <li>
        <span className={classes['detail-info-type']}>감독</span>
        <span className={classes['detail-info-value']}>
          {movieDetail.Casting.Items.length > 0 &&
            movieDetail.Casting.Items.find((staff) => staff.Role === '감독')
              .StaffName}
        </span>
      </li>
      <li>
        <span className={classes['detail-info-type']}>출연</span>
        <span className={classes['detail-info-value']}>
          {movieDetail.Casting.Items.filter((staff) => staff.Role === '배우')
            .map((staff) => staff.StaffName)
            .join(', ')}
        </span>
      </li>
    </ul>
  );
};

export default SummaryDetail;
