import React from 'react';
import styled, { css } from 'styled-components';

import SectionTitle from '../SectionTitle';
import ViewGradeIcon from '../../ViewGradeIcon';
import { getViewGradeIconOptions, numberWithCommas } from '../../../util';
import { useHistory } from 'react-router-dom';

const StepBlock = styled.div`
  width: 1200px;
`;

const Section = styled.section`
  ${({ width }) => css`
    width: ${width}px;
  `}
`;

const TicketingInfo = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 30px;
  height: 755px;
  border-right: 1px solid #ddd;
  img {
    width: 240px;
    border-radius: 4px;
    margin-bottom: 30px;
    margin-right: 30px;
  }
  & > div {
    width: 100%;
    margin-top: 24px;
    .movie-title {
      display: flex;
      align-items: center;
      margin-bottom: 14px;
      & > span {
        font-size: 22px;
        font-weight: bold;
        margin-left: 4px;
      }
    }
    .detail-info {
      font-size: 15px;
      position: relative;
      margin-bottom: 8px;
      .text {
        position: absolute;
        left: 75px;
        color: #666;
      }
    }
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 60px;
  width: 100%;
  background: #888;
  .btn-home {
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

const Step04 = ({ userTicketing }) => {
  const {
    movieName,
    posterUrl,
    viewGradeCode,
    cinemaName,
    screenName,
    screenDivisionName,
    playDate,
    playDay,
    startTime,
    endTime,
    seatNoList,
    price,
  } = userTicketing;
  const viewGradeIconOptions = getViewGradeIconOptions(viewGradeCode);
  const history = useHistory();
  const goHome = () => {
    history.push('/');
  };
  return (
    <StepBlock>
      <Section width={1200}>
        <SectionTitle title="결제내역" />
        <TicketingInfo>
          <img src={posterUrl} alt="poster" />
          <div>
            <div className="movie-title">
              <ViewGradeIcon
                size={25}
                color={viewGradeIconOptions.color}
                text={viewGradeIconOptions.text}
              />
              <span>{movieName}</span>
            </div>
            <div className="detail-info">
              <span>일시</span>
              <span className="text">{`${playDate} (${playDay}) ${startTime} ~ ${endTime}`}</span>
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
          </div>
        </TicketingInfo>
      </Section>
      <Footer>
        <button className="btn-home" onClick={goHome}>
          홈으로
        </button>
      </Footer>
    </StepBlock>
  );
};

export default Step04;
