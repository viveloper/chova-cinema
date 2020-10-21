import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setError } from '../../modules/login';

const SigninBlock = styled.div`
  padding: 60px 0;
  margin: 80px 0;
`;

const SigninFormBlock = styled.div`
  background: #f5f5f5;
  width: 100%;
  height: 360px;
  .center {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  form {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .input-group {
      flex: 1;
      input {
        display: block;
        width: 100%;
        height: 45px;
        padding: 0 18px;
        font-size: 14px;
        font-family: 'Noto Sans KR', 'Roboto', 'dotum', 'sans-serif';
        border: 1px solid #ddd;
        border-radius: 4px;
        outline: none;
      }
      input + input {
        margin-top: 10px;
      }
    }
    button {
      background: #ff243e;
      width: 110px;
      border: none;
      border-radius: 4px;
      outline: none;
      color: #fff;
      font-size: 16px;
      margin-left: 10px;
      cursor: pointer;
      transition: background 0.3s ease;
      &:hover {
        background: #ff7384;
      }
    }
  }
  .error-message {
    font-family: 'Noto Sans KR', 'Roboto', 'dotum', 'sans-serif';
    color: red;
    margin-top: 20px;
  }
`;

const Signin = ({ error, onSubmit }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setError(null));
    };
  }, [dispatch]);

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputs);
  };

  return (
    <SigninBlock>
      <div className="tabs"></div>
      <SigninFormBlock>
        <div className="center">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="이름을 입력해주세요"
                value={inputs.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="email"
                placeholder="이메일을 입력해주세요"
                value={inputs.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요"
                value={inputs.password}
                onChange={handleChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="비밀번호를 다시 한번 입력해주세요"
                value={inputs.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button type="submit">회원가입</button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </SigninFormBlock>
    </SigninBlock>
  );
};

export default Signin;
