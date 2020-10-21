import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../modules/login';
import { Redirect } from 'react-router-dom';
import Signin from '../components/Signin';

const SigninContainer = () => {
  const { loading, data, error } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    (inputs) => {
      const { name, email, password, confirmPassword } = inputs;
      dispatch(signin(name, email, password, confirmPassword));
    },
    [dispatch]
  );

  if (loading) return <div>loading...</div>;
  if (data) return <Redirect to="/" />;

  return <Signin error={error} onSubmit={handleSubmit} />;
};

export default SigninContainer;
