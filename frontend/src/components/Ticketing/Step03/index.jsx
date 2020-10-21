import React from 'react';
import styled, { css } from 'styled-components';

import SectionTitle from '../SectionTitle';
import { getViewGradeIconOptions, numberWithCommas } from '../../../util';
import ViewGradeIcon from '../../ViewGradeIcon';

const StepBlock = styled.div`
  width: 1200px;
  display: flex;
`;

const Section = styled.section`
  ${({ width }) => css`
    width: ${width}px;
  `}
`;

const TicketingInfo = styled.div`
  padding: 30px;
  height: 815px;
  border-right: 1px solid #ddd;
  img {
    width: 240px;
    margin: 0 auto;
    border-radius: 4px;
    margin-bottom: 30px;
  }
  .movie-title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    & > span {
      font-size: 17px;
      font-weight: bold;
      margin-left: 4px;
    }
  }
  .detail-info {
    font-size: 11px;
    position: relative;
    .text {
      position: absolute;
      left: 40px;
    }
  }
`;

const PaymentMethod = styled.div`
  height: 815px;
  border-right: 1px solid #ddd;
`;

const Payment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 815px;
  & > div {
    background: #414141;
    height: 54px;
    padding: 10px 30px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    .price-desc {
      font-size: 13px;
    }
    span:nth-child(2) {
      font-size: 11px;
    }
    .price {
      font-family: 'Roboto', 'dotum', 'sans-serif';
      font-size: 17px;
      font-weight: bold;
      margin-left: 8px;
      margin-right: 4px;
    }
  }
  & > div:first-child {
    border-top: none;
  }
  .btn-pay {
    background: #ff243e;
    height: 64px;
    width: 100%;
    border: none;
    outline: none;
    font-family: 'Noto Sans KR', 'Roboto', 'dotum', 'sans-serif';
    font-size: 17px;
    color: #fff;
    cursor: pointer;
  }
`;

const Step03 = ({ tempUserTicketingInfo, onPay }) => {
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
  } = tempUserTicketingInfo;

  const viewGradeIconOptions = getViewGradeIconOptions(viewGradeCode);

  return (
    <StepBlock>
      <Section width={300}>
        <SectionTitle title="예매정보" />
        <TicketingInfo>
          <img src={posterUrl} alt="poster" />
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
        </TicketingInfo>
      </Section>
      <Section width={480}>
        <SectionTitle title="결제수단" />
        <PaymentMethod></PaymentMethod>
      </Section>
      <Section width={420}>
        <SectionTitle title="결제하기" />
        <Payment>
          <div>
            <span className="price-desc">상품금액</span>
            <span>
              <span className="price">{numberWithCommas(price)}</span>원
            </span>
          </div>
          <div>
            <span className="price-desc">할인금액</span>
            <span>
              <span className="price">{'- 0'}</span>원
            </span>
          </div>
          <div>
            <span className="price-desc">결제금액</span>
            <span>
              총<span className="price">{numberWithCommas(price)}</span>원
            </span>
          </div>
          <button className="btn-pay" onClick={onPay}>
            결제하기
          </button>
        </Payment>
      </Section>
    </StepBlock>
  );
};

export default Step03;
