import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import SectionTitle from '../SectionTitle';
import ViewGradeIcon from '../../ViewGradeIcon';
import CountUpDown from './CountUpDown';

import { getViewGradeIconOptions, numberWithCommas } from '../../../util';

const StepBlock = styled.div`
  width: 1200px;
  background: #000;
  .text-info {
    p {
      color: #fff;
      text-align: center;
      font-size: 11px;
      margin: 15px 0 25px 0;
    }
  }
`;

const PersonSeatCount = styled.div`
  background: #fff;
  width: 100%;
  height: 117px;
  padding: 0 20px;
  display: flex;

  .movie-info {
    display: flex;
    align-items: center;
    img {
      display: block;
      width: 46px;
      border-radius: 4px;
    }
    .text-info {
      margin-left: 8px;
      width: 270px;
      .title {
        display: flex;
        align-items: center;
        & > span {
          font-size: 17px;
          font-weight: bold;
          margin-left: 4px;
        }
      }
      .detail-info {
        margin-top: 5px;
        font-size: 11px;
      }
    }
  }
  .person-count-list {
    width: 640px;
    display: flex;
    align-items: center;
    .person-count-item {
      display: flex;
      align-items: center;
      margin-left: 20px;
      & > span {
        font-size: 13px;
        margin-right: 8px;
      }
    }
  }
`;

const ScreenBlock = styled.div`
  width: 1170px;
  height: 470px;
  margin: 0 auto;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #888;
  }

  .screen {
    background: #6e6e6e;
    font-size: 16px;
    font-family: 'Roboto', 'Noto Sans KR';
    font-weight: bold;
    letter-spacing: 15px;
    text-align: center;
    color: #fff;
    padding: 5px 0;
  }
`;

const SeatsBlock = styled.div`
  position: relative;
  display: block;
  margin: 0 auto;
  ${({ width }) => css`
    width: ${width}px;
  `}
`;

const SeatRow = styled.div`
  font-family: 'Roboto', 'Noto Sans KR';
  font-size: 11px;
  color: #fff;
  ${({ x, y }) => {
    if (x || y) {
      return css`
        position: absolute;
        left: ${x}px;
        top: ${y}px;
      `;
    }
  }}
`;

const Seat = styled.div`
  width: 21px;
  height: 16px;
  font-size: 10px;
  background: #e8e8e8;
  border-radius: 7px 7px 0px 0px;
  font-family: 'Roboto', 'Noto Sans KR';
  display: flex;
  justify-content: center;
  align-items: center;  
  ${({ x, y }) => {
    if (x || y) {
      return css`
        position: absolute;
        left: ${x}px;
        top: ${y}px;
      `;
    }
  }}
  ${({ size }) => {
    if (size === 'small') {
      return css`
        width: 14px;
        height: 10px;
        border-radius: 4px 4px 0px 0px;
      `;
    }
  }}
  ${({ status }) => {
    if (status === 0) {
      return css`
        background: #e8e8e8;
        cursor: pointer;
      `;
    } else if (status === 30) {
      return css`
        background: #714034;
        opacity: 0.5;
      `;
    } else if (status === 50 || status === 23 || status === 28) {
      return css`
        background: #444;
      `;
    }
  }}
  ${({ sweetSpot }) =>
    sweetSpot
      ? css`
          border: 1px solid #d41017;
        `
      : ''}
  ${({ active }) =>
    active
      ? css`
          background: #ff243e;
          color: #fff;
        `
      : ''}  
`;

const SeatsInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 41px;
  margin: 35px 0;
  padding-left: 40px;
  /* background: #333; */

  .seat-info-group {
    display: flex;

    .seat-info {
      display: flex;
      align-items: center;
      span {
        font-size: 12px;
        color: #fff;
        margin-left: 4px;
      }
    }
    .seat-info + .seat-info {
      margin-left: 8px;
    }
  }
`;

const PersonSeatSummary = styled.div`
  display: flex;
  height: 60px;
  width: 100%;
  .seat-result {
    flex: 1;
    background: #888;
    font-size: 15px;
    color: #fff;
    padding-left: 30px;
    padding-top: 10px;
    display: flex;
    align-items: baseline;
    .result {
      font-family: 'Roboto';
      font-size: 25px;
      margin-left: 10px;
    }
  }
  .btn-pay {
    flex: 0 0 180px;
    background: #ff243e;
    border: none;
    outline: none;
    font-family: 'Noto Sans KR', 'Roboto', 'dotum', 'sans-serif';
    font-size: 15px;
    color: #fff;
    cursor: pointer;
  }
`;

const Step02 = ({
  screenSeatInfo,
  seats,
  customerDivision,
  fees,
  playMovieInfo,
  goPayment,
}) => {
  const [customerCount, setCustomerCount] = useState({
    adult: 0,
    youth: 0,
    senior: 0,
    disabled: 0,
  });
  const [activeSeats, setActiveSeats] = useState([]);

  const viewGradeIconOptions = getViewGradeIconOptions(
    playMovieInfo.ViewGradeCode
  );

  const xScaleRatio =
    (screenSeatInfo.EndXCoordinate - screenSeatInfo.StartXCoordinate) /
    screenSeatInfo.MaxSeatColumn /
    27;
  const yScaleRatio = screenSeatInfo.StartYCoordinate / 96;
  const seatsBlockWidth = screenSeatInfo.EndXCoordinate / xScaleRatio + 100;

  const price = fees.reduce((acc, item) => {
    const key = customerDivision
      .find(
        (division) =>
          division.CustomerDivisionCode === item.CustomerDivisionCode
      )
      .CustomerDivisionNameUS.toLowerCase();
    return acc + customerCount[key] * item.MovieFee;
  }, 0);

  const textPrice = numberWithCommas(price);

  const handleCustomerCountUpClick = (key) => {
    const totalNextCount =
      customerDivision.reduce(
        (acc, division) =>
          acc + customerCount[division.CustomerDivisionNameUS.toLowerCase()],
        0
      ) + 1;
    const nextCount = customerCount[key] + 1;
    if (totalNextCount > 8 || nextCount < 0) return;
    setCustomerCount({
      ...customerCount,
      [key]: customerCount[key] + 1,
    });
    setActiveSeats([]);
  };
  const handleCustomerCountDownClick = (key) => {
    const totalNextCount =
      customerDivision.reduce(
        (acc, division) =>
          acc + customerCount[division.CustomerDivisionNameUS.toLowerCase()],
        0
      ) - 1;
    const nextCount = customerCount[key] - 1;
    if (totalNextCount > 8 || nextCount < 0) return;
    setCustomerCount({
      ...customerCount,
      [key]: customerCount[key] - 1,
    });
    setActiveSeats([]);
  };

  const handleSeatClick = (seatNo, status) => {
    const totalPersonCount =
      customerCount.adult +
      customerCount.youth +
      customerCount.senior +
      customerCount.disabled;
    if (totalPersonCount === 0) {
      alert('인원을 선택하세요.');
      return;
    }
    if (status !== 0) return;
    setActiveSeats(
      activeSeats.includes(seatNo)
        ? activeSeats.filter((activeSeat) => activeSeat !== seatNo)
        : activeSeats.length < totalPersonCount
        ? [...activeSeats, seatNo]
        : activeSeats
    );
  };

  const handlePayClick = () => {
    const totalPersonCount =
      customerCount.adult +
      customerCount.youth +
      customerCount.senior +
      customerCount.disabled;
    if (activeSeats.length === 0 || totalPersonCount !== activeSeats.length) {
      alert('좌석을 선택하세요.');
      return;
    }
    goPayment({
      activeSeats,
      price,
    });
  };

  return (
    <StepBlock>
      <SectionTitle title={'인원/좌석 선택'} />
      <PersonSeatCount>
        <div className="movie-info">
          <img src={playMovieInfo.PosterURL} alt="poster" />
          <div className="text-info">
            <div className="title">
              <ViewGradeIcon
                size={22}
                color={viewGradeIconOptions.color}
                text={viewGradeIconOptions.text}
              />
              <span>{playMovieInfo.MovieNameKR}</span>
            </div>
            <div className="detail-info">
              <div className="time">
                {`${playMovieInfo.divisions[0].times[0].PlayDt}(${playMovieInfo.divisions[0].times[0].PlayDayKR}) | ${playMovieInfo.divisions[0].times[0].StartTime}~${playMovieInfo.divisions[0].times[0].EndTime}`}
              </div>
              <div className="screen">{`${playMovieInfo.divisions[0].CinemaNameKR} | ${playMovieInfo.divisions[0].times[0].ScreenNameKR} | ${playMovieInfo.divisions[0].ScreenDivisionNameKR}`}</div>
            </div>
          </div>
        </div>
        <div className="person-count-list">
          {customerDivision.map((division) => (
            <div
              key={division.CustomerDivisionCode}
              className="person-count-item"
            >
              <span>{division.CustomerDivisionNameKR}</span>
              <CountUpDown
                count={
                  customerCount[division.CustomerDivisionNameUS.toLowerCase()]
                }
                onUpClick={() =>
                  handleCustomerCountUpClick(
                    division.CustomerDivisionNameUS.toLowerCase()
                  )
                }
                onDownClick={() =>
                  handleCustomerCountDownClick(
                    division.CustomerDivisionNameUS.toLowerCase()
                  )
                }
              />
            </div>
          ))}
        </div>
      </PersonSeatCount>
      <div className="text-info">
        <p>{'- 인원을 선택하세요'}</p>
        {/* <p>{'- 좌석 선택 후 결제하기 버튼을 클릭하세요'}</p> */}
      </div>
      <ScreenBlock>
        <div className="screen">SCREEN</div>
        <SeatsBlock width={seatsBlockWidth}>
          {seats.map((seat) => (
            <React.Fragment key={seat.SeatNo}>
              <SeatRow x={0} y={seat.SeatYCoordinate / yScaleRatio - 60}>
                {seat.SeatRow}
              </SeatRow>
              <Seat
                x={seat.SeatXCoordinate / xScaleRatio}
                y={seat.SeatYCoordinate / yScaleRatio - 60}
                status={seat.SeatStatusCode}
                sweetSpot={seat.SweetSpotYN === 'Y' ? true : false}
                active={activeSeats.includes(seat.SeatNo)}
                onClick={() =>
                  handleSeatClick(seat.SeatNo, seat.SeatStatusCode)
                }
              >
                {seat.SeatColumn}
              </Seat>
            </React.Fragment>
          ))}
        </SeatsBlock>
      </ScreenBlock>
      <SeatsInfoBlock>
        <div className="seat-info-group">
          <div className="seat-info">
            <Seat size="small" status={0} /> <span>선택가능</span>
          </div>
          <div className="seat-info">
            <Seat size="small" status={50} /> <span>예매완료</span>
          </div>
        </div>
        <div className="seat-info-group">
          <div className="seat-info">
            <Seat size="small" status={30} /> <span>거리두기석</span>
          </div>
          <div className="seat-info">
            <Seat size="small" sweetSpot /> <span>스위트스팟</span>
          </div>
        </div>
      </SeatsInfoBlock>
      <PersonSeatSummary>
        <div className="seat-result">
          총 합계 <span className="result">{textPrice}</span>원
        </div>
        <button className="btn-pay" onClick={handlePayClick}>
          결제하기
        </button>
      </PersonSeatSummary>
    </StepBlock>
  );
};

export default Step02;
