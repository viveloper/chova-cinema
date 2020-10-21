import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieListPage from './pages/MovieListPage';
import MovieDetailPage from './pages/MovieDetailPage';
import TicketingPage from './pages/TicketingPage';
import SigninPage from './pages/SigninPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import ErrorPage from './pages/Error';
import { useDispatch } from 'react-redux';
import { setToken, getUser } from './modules/login';

function App() {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  if (token) {
    dispatch(setToken(token));
    dispatch(getUser());
  }

  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/signin" component={SigninPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/movies" exact component={MoviesPage} />
      <Route path="/movies/:listType" component={MovieListPage} />
      <Route path="/movieDetail/:movieCode" component={MovieDetailPage} />
      <Route path="/ticketing" component={TicketingPage} />
      <Route path="/mypage" component={MyPage} />
      <Route path="*" component={ErrorPage} />
    </Switch>
  );
}

export default App;
