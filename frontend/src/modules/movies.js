import { takeLatest, call, put } from 'redux-saga/effects';
import * as api from '../api';

const GET_MOVIES = 'GET_MOVIES';
const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS';
const GET_MOVIES_ERROR = 'GET_MOVIES_ERROR';
const GET_CURRENT_MOVIE_LIST = 'GET_CURRENT_MOVIE_LIST';
const GET_CURRENT_MOVIE_LIST_SUCCESS = 'GET_CURRENT_MOVIE_LIST_SUCCESS';
const GET_CURRENT_MOVIE_LIST_ERROR = 'GET_CURRENT_MOVIE_LIST_ERROR';
const GET_PRE_MOVIE_LIST = 'GET_PRE_MOVIE_LIST';
const GET_PRE_MOVIE_LIST_SUCCESS = 'GET_PRE_MOVIE_LIST_SUCCESS';
const GET_PRE_MOVIE_LIST_ERROR = 'GET_PRE_MOVIE_LIST_ERROR';
const GET_ARTE_MOVIE_LIST = 'GET_ARTE_MOVIE_LIST';
const GET_ARTE_MOVIE_LIST_SUCCESS = 'GET_ARTE_MOVIE_LIST_SUCCESS';
const GET_ARTE_MOVIE_LIST_ERROR = 'GET_ARTE_MOVIE_LIST_ERROR';
const GET_OPERA_MOVIE_LIST = 'GET_OPERA_MOVIE_LIST';
const GET_OPERA_MOVIE_LIST_SUCCESS = 'GET_OPERA_MOVIE_LIST_SUCCESS';
const GET_OPERA_MOVIE_LIST_ERROR = 'GET_OPERA_MOVIE_LIST_ERROR';

export const getMovies = () => ({ type: GET_MOVIES });
export const getCurrentMovieList = () => ({ type: GET_CURRENT_MOVIE_LIST });
export const getPreMovieList = () => ({ type: GET_PRE_MOVIE_LIST });
export const getArteMovieList = () => ({ type: GET_ARTE_MOVIE_LIST });
export const getOperaMovieList = () => ({ type: GET_OPERA_MOVIE_LIST });

function* getMoviesSaga() {
  try {
    const data = yield call(api.getMovies);
    yield put({
      type: GET_MOVIES_SUCCESS,
      payload: data.filter((item) => item.RepresentationMovieCode !== 'AD'),
    });
  } catch (e) {
    yield put({
      type: GET_MOVIES_ERROR,
      payload: e,
    });
  }
}

function* getCurrentMovieListSaga() {
  try {
    const data = yield call(api.getMovieList, 'current');
    yield put({
      type: GET_CURRENT_MOVIE_LIST_SUCCESS,
      payload: data.filter((item) => item.RepresentationMovieCode !== 'AD'),
    });
  } catch (e) {
    yield put({
      type: GET_CURRENT_MOVIE_LIST_ERROR,
      payload: e,
    });
  }
}

function* getPreMovieListSaga() {
  try {
    const data = yield call(api.getMovieList, 'pre');
    yield put({
      type: GET_PRE_MOVIE_LIST_SUCCESS,
      payload: data.filter((item) => item.RepresentationMovieCode !== 'AD'),
    });
  } catch (e) {
    yield put({
      type: GET_PRE_MOVIE_LIST_ERROR,
      payload: e,
    });
  }
}

function* getArteMovieListSaga() {
  try {
    const data = yield call(api.getMovieList, 'arte');
    yield put({
      type: GET_ARTE_MOVIE_LIST_SUCCESS,
      payload: data.filter((item) => item.RepresentationMovieCode !== 'AD'),
    });
  } catch (e) {
    yield put({
      type: GET_ARTE_MOVIE_LIST_ERROR,
      payload: e,
    });
  }
}

function* getOperaMovieListSaga() {
  try {
    const data = yield call(api.getMovieList, 'opera');
    yield put({
      type: GET_OPERA_MOVIE_LIST_SUCCESS,
      payload: data.filter((item) => item.RepresentationMovieCode !== 'AD'),
    });
  } catch (e) {
    yield put({
      type: GET_OPERA_MOVIE_LIST_ERROR,
      payload: e,
    });
  }
}

export function* moviesSaga() {
  yield takeLatest(GET_MOVIES, getMoviesSaga);
  yield takeLatest(GET_CURRENT_MOVIE_LIST, getCurrentMovieListSaga);
  yield takeLatest(GET_PRE_MOVIE_LIST, getPreMovieListSaga);
  yield takeLatest(GET_ARTE_MOVIE_LIST, getArteMovieListSaga);
  yield takeLatest(GET_OPERA_MOVIE_LIST, getOperaMovieListSaga);
}

const initialState = {
  movies: {
    loading: false,
    data: null,
    error: null,
  },
  currentMovieList: {
    loading: false,
    data: null,
    error: null,
  },
  preMovieList: {
    loading: false,
    data: null,
    error: null,
  },
  arteMovieList: {
    loading: false,
    data: null,
    error: null,
  },
  operaMovieList: {
    loading: false,
    data: null,
    error: null,
  },
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case GET_MOVIES_ERROR:
      return {
        ...state,
        movies: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };
    case GET_CURRENT_MOVIE_LIST:
      return {
        ...state,
        currentMovieList: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_CURRENT_MOVIE_LIST_SUCCESS:
      return {
        ...state,
        currentMovieList: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case GET_CURRENT_MOVIE_LIST_ERROR:
      return {
        ...state,
        currentMovieList: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };
    case GET_PRE_MOVIE_LIST:
      return {
        ...state,
        preMovieList: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_PRE_MOVIE_LIST_SUCCESS:
      return {
        ...state,
        preMovieList: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case GET_PRE_MOVIE_LIST_ERROR:
      return {
        ...state,
        preMovieList: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };
    case GET_ARTE_MOVIE_LIST:
      return {
        ...state,
        arteMovieList: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_ARTE_MOVIE_LIST_SUCCESS:
      return {
        ...state,
        arteMovieList: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case GET_ARTE_MOVIE_LIST_ERROR:
      return {
        ...state,
        arteMovieList: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };
    case GET_OPERA_MOVIE_LIST:
      return {
        ...state,
        operaMovieList: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_OPERA_MOVIE_LIST_SUCCESS:
      return {
        ...state,
        operaMovieList: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case GET_OPERA_MOVIE_LIST_ERROR:
      return {
        ...state,
        operaMovieList: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export default moviesReducer;
