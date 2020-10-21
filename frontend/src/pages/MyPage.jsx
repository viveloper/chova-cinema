import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import MyPageContainer from '../containers/MyPageContainer';

const MyPage = () => {
  const loginData = useSelector((state) => state.login.data);
  if (!loginData) return <Redirect to="/login" />;
  return (
    <Layout theme="light">
      <MyPageContainer />
    </Layout>
  );
};

export default MyPage;
