import React from 'react';
import styled from 'styled-components';
import TicketingItem from './TicketingItem';

const MyPageBlock = styled.div`
  padding-top: 60px;
  .header {
    font-size: 26px;
  }
`;

const TicketingList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 30px 0;
`;

const MyPage = ({ userTicketingList, onMovieCancel }) => {
  return (
    <div className="center">
      <MyPageBlock>
        {userTicketingList.length === 0 ? (
          <div className="header">결제내역이 없습니다.</div>
        ) : (
          <>
            <div className="header">결제내역</div>
            <TicketingList>
              {userTicketingList.map((userTicketing) => (
                <TicketingItem
                  key={userTicketing.ticketingId}
                  userTicketing={userTicketing}
                  onMovieCancel={onMovieCancel}
                />
              ))}
            </TicketingList>
          </>
        )}
      </MyPageBlock>
    </div>
  );
};

export default React.memo(MyPage);
