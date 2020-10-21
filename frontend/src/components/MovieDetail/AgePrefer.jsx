import React from 'react';
import classes from './AgePrefer.module.css';

const AgePrefer = ({ agePrefer10, agePrefer20, agePrefer30, agePrefer40 }) => {
  const ageGraphHighlightIndex = getAgeGraphHighlightIndex(
    agePrefer10,
    agePrefer20,
    agePrefer30,
    agePrefer40
  );
  return (
    <div className={`${classes['prefer']} ${classes['age']}`}>
      <div className={classes['graph']}>
        <div
          className={`${classes['bar']} ${classes['gen10']}`}
          style={{
            height: `${agePrefer10}%`,
            backgroundColor: `${
              ageGraphHighlightIndex === 0 ? '#f51641' : null
            }`,
          }}
        ></div>
        <div
          className={`${classes['bar']} ${classes['gen20']}`}
          style={{
            height: `${agePrefer20}%`,
            backgroundColor: `${
              ageGraphHighlightIndex === 1 ? '#f51641' : null
            }`,
          }}
        ></div>
        <div
          className={`${classes['bar']} ${classes['gen30']}`}
          style={{
            height: `${agePrefer30}%`,
            backgroundColor: `${
              ageGraphHighlightIndex === 2 ? '#f51641' : null
            }`,
          }}
        ></div>
        <div
          className={`${classes['bar']} ${classes['gen40']}`}
          style={{
            height: `${agePrefer40}%`,
            backgroundColor: `${
              ageGraphHighlightIndex === 3 ? '#f51641' : null
            }`,
          }}
        ></div>
        <span
          className={`${classes['value']} ${classes['gen10']}`}
          style={{
            bottom: `${agePrefer10}%`,
            color: `${ageGraphHighlightIndex === 0 ? '#f51641' : null}`,
          }}
        >{`${agePrefer10}%`}</span>
        <span
          className={`${classes['value']} ${classes['gen20']}`}
          style={{
            bottom: `${agePrefer20}%`,
            color: `${ageGraphHighlightIndex === 1 ? '#f51641' : null}`,
          }}
        >{`${agePrefer20}%`}</span>
        <span
          className={`${classes['value']} ${classes['gen30']}`}
          style={{
            bottom: `${agePrefer30}%`,
            color: `${ageGraphHighlightIndex === 2 ? '#f51641' : null}`,
          }}
        >{`${agePrefer30}%`}</span>
        <span
          className={`${classes['value']} ${classes['gen40']}`}
          style={{
            bottom: `${agePrefer40}%`,
            color: `${ageGraphHighlightIndex === 3 ? '#f51641' : null}`,
          }}
        >{`${agePrefer40}%`}</span>
      </div>
      <div className={classes['keyword']}>
        <span>10대</span>
        <span>20대</span>
        <span>30대</span>
        <span>40대</span>
      </div>
    </div>
  );
};

const getAgeGraphHighlightIndex = (
  agePrefer10,
  agePrefer20,
  agePrefer30,
  agePrefer40
) => {
  const agePrefers = [];
  agePrefers.push(agePrefer10);
  agePrefers.push(agePrefer20);
  agePrefers.push(agePrefer30);
  agePrefers.push(agePrefer40);
  const sortedAgePrefers = [...agePrefers];
  sortedAgePrefers.sort((a, b) => b - a);
  const max = sortedAgePrefers[0];
  return agePrefers.findIndex((item) => item === max);
};

export default AgePrefer;
