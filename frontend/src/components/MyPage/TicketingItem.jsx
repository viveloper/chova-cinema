import React from 'react';
import styled from 'styled-components';
import ViewGradeIcon from '../ViewGradeIcon';
import { getViewGradeIconOptions, numberWithCommas } from '../../util';

const TicketingItemBlock = styled.li`
  width: 490px;
  display: flex;
  align-items: flex-start;
  padding-right: 15px;
  padding-bottom: 30px;
  img {
    width: 184px;
    border-radius: 4px;
    margin-right: 15px;
  }
  & > div {
    width: 100%;
    height: 100%;
    padding-top: 8px;
    position: relative;
    .movie-title {
      display: flex;
      align-items: center;
      margin-bottom: 14px;
      & > span {
        font-size: 18px;
        font-weight: bold;
        margin-left: 4px;
      }
    }
    .detail-info {
      font-size: 14px;
      position: relative;
      margin-bottom: 8px;
      .text {
        position: absolute;
        left: 70px;
        color: #666;
      }
    }
    .btn-cancel {
      position: absolute;
      right: 30px;
      bottom: 15px;
      background: transparent;
      outline: none;
      border: 1px solid #000;
      border-radius: 4px;
      padding: 4px 8px;
      font-family: 'Noto Sans KR', 'Roboto', 'dotum', 'sans-serif';
      font-size: 13px;
      cursor: pointer;
    }
  }
`;

const TicketingItem = ({ userTicketing, onMovieCancel }) => {
  const {
    ticketingId,
    movieName,
    posterUrl,
    viewGradeCode,
    cinemaName,
    screenName,
    screenDivisionName,
    playDate,
    startTime,
    endTime,
    seatNoList,
    price,
  } = userTicketing;
  const viewGradeIconOptions = getViewGradeIconOptions(viewGradeCode);
  return (
    <TicketingItemBlock>
      <img src={posterUrl} alt="poster" />
      <div>
        <div className="movie-title">
          <ViewGradeIcon
            size={22}
            color={viewGradeIconOptions.color}
            text={viewGradeIconOptions.text}
          />
          <span>{movieName}</span>
        </div>
        <div className="detail-info">
          <span>일시</span>
          <span className="text">{`${playDate} ${startTime}~${endTime}`}</span>
        </div>
        <div className="detail-info">
          <span>영화관</span>
          <span className="text">{`${cinemaName} ${screenName} - ${screenDivisionName}`}</span>
        </div>
        <div className="detail-info">
          <span>인원</span>
          <span className="text">{seatNoList.length}</span>
        </div>
        <div className="detail-info">
          <span>좌석</span>
          <span className="text">
            {seatNoList.map((seatNo) => seatNo.substring(1)).join(', ')}
          </span>
        </div>
        <div className="detail-info">
          <span>결제금액</span>
          <span className="text">{`${numberWithCommas(price)} 원`}</span>
        </div>
        <button
          className="btn-cancel"
          onClick={() => onMovieCancel(ticketingId)}
        >
          결제취소
        </button>
      </div>
    </TicketingItemBlock>
  );
};

export default TicketingItem;
