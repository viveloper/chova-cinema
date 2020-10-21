import React, { useEffect, useCallback } from 'react';
import MyPage from '../components/MyPage';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUserTicketing,
  deleteUserTicketing,
} from '../modules/userTicketing';

const MyPageContainer = () => {
  const { loading, data: userTicketingList, error } = useSelector(
    (state) => state.userTicketing.userTicketingList
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserTicketing());
  }, [dispatch]);

  const handleMovieCancel = useCallback(
    (ticketingId) => {
      if (window.confirm('정말 취소하시겠습니까?')) {
        dispatch(deleteUserTicketing(ticketingId));
      }
    },
    [dispatch]
  );

  if (loading) return <div>loading...</div>;
  if (error) return <div>error!</div>;
  if (!userTicketingList) return null;

  return (
    <MyPage
      userTicketingList={userTicketingList}
      onMovieCancel={handleMovieCancel}
    />
  );
};

export default MyPageContainer;
