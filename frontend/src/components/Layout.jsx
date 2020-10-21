import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../modules/login';

const Layout = ({ children, theme }) => {
  const { data } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <Header theme={theme} isLogin={!!data} onLogout={handleLogout} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
