import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as api from '../api';

const SIGNIN = 'SIGNIN';
const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
const SIGNIN_ERROR = 'SIGNIN_ERROR';
const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOGOUT = 'LOGOUT';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_ERROR = 'LOGOUT_ERROR';
const GET_USER = 'GET_USER';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const GET_USER_ERROR = 'GET_USER_ERROR';
const SET_USER = 'SET_USER';
const SET_TOKEN = 'SET_TOKEN';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

export const signin = (name, email, password, confirmPassword) => ({
  type: SIGNIN,
  payload: {
    name,
    email,
    password,
    confirmPassword,
  },
});

export const login = (email, password) => ({
  type: LOGIN,
  payload: {
    email,
    password,
  },
});

export const logout = () => ({
  type: LOGOUT,
});

export const getUser = () => ({ type: GET_USER });

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});

export const setError = (error) => ({
  type: SET_ERROR_MESSAGE,
  payload: error,
});

// worker saga
function* signinWorkderSaga(action) {
  const { name, email, password, confirmPassword } = action.payload;

  try {
    const { token, user } = yield call(
      api.signin,
      name,
      email,
      password,
      confirmPassword
    );
    yield put({
      type: SIGNIN_SUCCESS,
      payload: {
        token,
        user,
      },
    });
    localStorage.setItem('token', token);
  } catch (e) {
    yield put({
      type: SIGNIN_ERROR,
      payload: e,
    });
  }
}
function* loginWorkerSaga(action) {
  const { email, password } = action.payload;
  try {
    const { token, user } = yield call(api.login, email, password);
    yield put({
      type: LOGIN_SUCCESS,
      payload: {
        token,
        user,
      },
    });
    localStorage.setItem('token', token);
  } catch (e) {
    yield put({
      type: LOGIN_ERROR,
      payload: e,
    });
  }
}
function* logoutWorkerSaga() {
  const { token } = yield select((state) => state.login.data);
  try {
    yield call(api.logout, token);
    yield put({
      type: LOGOUT_SUCCESS,
    });
    localStorage.removeItem('token');
  } catch (e) {
    yield put({
      type: LOGOUT_ERROR,
      payload: e,
    });
  }
}
function* getUserSaga() {
  const { token } = yield select((state) => state.login.data);
  try {
    const user = yield call(api.getUser, token);
    yield put({
      type: GET_USER_SUCCESS,
      payload: user,
    });
  } catch (e) {
    yield put({
      type: GET_USER_ERROR,
      payload: e,
    });
  }
}

// watcher saga
export function* loginSaga() {
  yield takeLatest(SIGNIN, signinWorkderSaga);
  yield takeLatest(LOGIN, loginWorkerSaga);
  yield takeLatest(LOGOUT, logoutWorkerSaga);
  yield takeLatest(GET_USER, getUserSaga);
}

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case SIGNIN_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case SIGNIN_ERROR:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    case LOGIN:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case LOGIN_ERROR:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        loading: true,
        data: state.data,
        error: null,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        data: null,
        error: null,
      };
    case LOGOUT_ERROR:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    case GET_USER:
      return {
        loading: true,
        data: {
          ...state.data,
          user: null,
        },
        error: null,
      };
    case GET_USER_SUCCESS:
      return {
        loading: false,
        data: {
          ...state.data,
          user: action.payload,
        },
        error: null,
      };
    case GET_USER_ERROR:
      return {
        loading: false,
        data: {
          ...state.data,
          user: null,
        },
        error: action.payload,
      };
    case SET_USER:
      return {
        loading: false,
        data: {
          ...state.data,
          user: action.payload,
        },
        error: null,
      };
    case SET_TOKEN:
      return {
        loading: false,
        data: {
          ...state.data,
          token: action.payload,
        },
        error: null,
      };
    case SET_ERROR_MESSAGE:
      return {
        loading: false,
        data: state.data,
        error: action.payload,
      };
    default:
      return state;
  }
}
