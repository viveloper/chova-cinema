import React from 'react';
import ViewGradeIcon from '../../ViewGradeIcon';
import classes from './ResultView.module.css';

import { getViewGradeIconOptions } from '../../../util';

const ResultView = ({ playMovieList, onTimeClick }) => {
  const handleTimeClick = (e, params) => {
    e.preventDefault();
    onTimeClick(params);
  };

  if (!playMovieList || !playMovieList.length) {
    return (
      <div className={classes['no-result']}>
        <div className={classes['center']}>
          <img src="/img/icons/film.png" alt="film.png" />
          <p>조회 가능한 상영시간이 없습니다.</p>
          <p>조건을 변경해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={classes['result-view']}>
      {playMovieList.map((movie) => {
        const viewGradeIconOptions = getViewGradeIconOptions(
          movie.ViewGradeCode
        );
        return (
          <div key={movie.RepresentationMovieCode} className={classes['movie']}>
            <div className={classes['movie-title']}>
              <ViewGradeIcon
                size={22}
                color={viewGradeIconOptions.color}
                text={viewGradeIconOptions.text}
              />
              <span className={classes['movie-name']}>{movie.MovieNameKR}</span>
            </div>
            {movie.divisions.map((division) => (
              <div
                key={`${division.FilmCode}|${division.ScreenDivisionCode}|${division.TranslationDivisionCode}`}
                className={classes['division']}
              >
                <div className={classes['division-title']}>
                  <div className={classes['hall']}>
                    {`${division.FilmNameKR}${
                      division.TranslationDivisionCode === 900
                        ? ''
                        : division.TranslationDivisionCode === 100
                        ? ` | 자막`
                        : division.TranslationDivisionCode === 50
                        ? ' | 더빙'
                        : ''
                    }${
                      division.ScreenDivisionCode === 100
                        ? ''
                        : ` | ${division.ScreenDivisionNameKR}`
                    }`}
                  </div>
                  <div
                    className={classes['desc']}
                  >{`${division.ScreenDesc}`}</div>
                </div>
                <ul className={classes['play-seqs']}>
                  {division.times
                    .sort((a, b) => (a.StartTime < b.StartTime ? -1 : 1))
                    .map((time) => (
                      <li
                        key={`${time.ScreenID}|${time.PlaySequence}`}
                        className={classes['play-seq']}
                      >
                        <a
                          href="#PersonSeat"
                          onClick={(e) =>
                            handleTimeClick(e, {
                              playMovieInfo: {
                                ...movie,
                                divisions: [
                                  {
                                    ...division,
                                    times: [{ ...time }],
                                  },
                                ],
                              },
                              screenId: time.ScreenID,
                              playDate: time.PlayDt,
                              playSequence: time.PlaySequence,
                              screenDivisionCode: division.ScreenDivisionCode,
                            })
                          }
                        >
                          <strong className={classes['time']}>
                            {time.StartTime}
                          </strong>
                          <div className={classes['screen-info']}>
                            <span className={classes['seat-count']}>
                              <span className={classes['booking-seat-count']}>
                                {time.BookingSeatCount}
                              </span>
                              <span
                                className={classes['total-seat-count']}
                              >{` / ${time.TotalSeatCount}`}</span>
                            </span>
                            <span
                              className={classes['screen-name']}
                            >{`${time.ScreenNameKR}`}</span>
                          </div>
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ResultView;

// const sampleMovieList = [
//   {
//     RepresentationMovieCode: '15449',
//     MovieNameKR: '1917',
//     MovieNameUS: '1917',
//     ViewGradeCode: 15,
//     divisions: [
//       {
//         FilmCode: 200,
//         FilmNameKR: '2D',
//         FilmNameUS: '2D',
//         ScreenDivisionCode: 100,
//         ScreenDivisionNameKR: '일반',
//         ScreenDivisionNameUS: '(EN)일반',
//         ScreenDesc: '본 상영관은 타 상영관과 영화 요금이 동일합니다.',
//         times: [
//           {
//             PlaySequence: 1,
//             PlayDt: '2020-04-24',
//             StartTime: '11:00',
//             EndTime: '11:56',
//             TotalSeatCount: 175,
//             BookingSeatCount: 172,
//             ScreenID: 100407,
//             ScreenNameKR: '7관',
//             ScreenNameUS: 'CINEMA 7',
//           },
//           {
//             PlaySequence: 2,
//             PlayDt: '2020-04-24',
//             StartTime: '13:00',
//             EndTime: '13:56',
//             TotalSeatCount: 175,
//             BookingSeatCount: 172,
//             ScreenID: 100407,
//             ScreenNameKR: '7관',
//             ScreenNameUS: 'CINEMA 7',
//           },
//         ],
//       },
//       {
//         FilmCode: 200,
//         FilmNameKR: '2D',
//         FilmNameUS: '2D',
//         ScreenDivisionCode: 980,
//         ScreenDivisionNameKR: '수퍼 S',
//         ScreenDivisionNameUS: '(US)수퍼 S',
//         ScreenDesc:
//           '더욱 선명한 화질의 수퍼 S는 일반 요금과 동일한 프로모션이 진행 중입니다. ',
//         times: [
//           {
//             PlaySequence: 1,
//             PlayDt: '2020-04-24',
//             StartTime: '11:00',
//             EndTime: '11:56',
//             TotalSeatCount: 175,
//             BookingSeatCount: 172,
//             ScreenID: 100407,
//             ScreenNameKR: '7관',
//             ScreenNameUS: 'CINEMA 7',
//           },
//           {
//             PlaySequence: 2,
//             PlayDt: '2020-04-24',
//             StartTime: '13:00',
//             EndTime: '13:56',
//             TotalSeatCount: 175,
//             BookingSeatCount: 172,
//             ScreenID: 100407,
//             ScreenNameKR: '7관',
//             ScreenNameUS: 'CINEMA 7',
//           },
//         ],
//       },
//     ],
//   },
// ];
