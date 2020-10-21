import React from 'react';
import Login from '../components/Login';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../modules/login';
import { Redirect } from 'react-router-dom';

const LoginContainer = () => {
  const { loading, data, error } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const handleSubmit = (inputs) => {
    const { email, password } = inputs;
    dispatch(login(email, password));
  };

  if (loading) return <div>loading...</div>;
  if (data) return <Redirect to="/" />;

  return <Login error={error} onSubmit={handleSubmit} />;
};

export default LoginContainer;
