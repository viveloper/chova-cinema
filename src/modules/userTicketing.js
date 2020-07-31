import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as api from '../api';
import { setUser } from './login';
import { getPlaySeqs } from './playSeqs';
import { getSeats } from './seats';

// action type
const GET_USER_TICKETING_LIST = 'GET_USER_TICKETING_LIST';
const GET_USER_TICKETING_LIST_SUCCESS = 'GET_USER_TICKETING_LIST_SUCCESS';
const GET_USER_TICKETING_LIST_ERROR = 'GET_USER_TICKETING_LIST_ERROR';
const ADD_USER_TICKETING = 'ADD_USER_TICKETING';
const ADD_USER_TICKETING_SUCCESS = 'ADD_USER_TICKETING_SUCCESS';
const ADD_USER_TICKETING_ERROR = 'ADD_USER_TICKETING_ERROR';

// action creator
export const getUserTicketing = () => ({
  type: GET_USER_TICKETING_LIST,
});
export const addUserTicketing = (params) => ({
  type: ADD_USER_TICKETING,
  payload: params,
});

// worker saga
function* getUserTicketingSaga() {
  const { token } = yield select((state) => state.login.data);
  try {
    const userTicketingData = yield call(api.getUserTicketing, token);
    yield put({
      type: GET_USER_TICKETING_LIST_SUCCESS,
      payload: userTicketingData.userTicketingList,
    });
  } catch (e) {
    yield put({
      type: GET_USER_TICKETING_LIST_ERROR,
      payload: e,
    });
  }
}
function* addUserTicketingSaga(action) {
  const {
    movieCode,
    movieName,
    posterUrl,
    viewGradeCode,
    divisionCode,
    detailDivisionCode,
    cinemaId,
    cinemaName,
    screenId,
    screenName,
    screenDivisionCode,
    screenDivisionName,
    playSequence,
    playDate,
    playDay,
    startTime,
    endTime,
    seatNoList,
    price,
  } = action.payload;
  const { token, user } = yield select((state) => state.login.data);
  try {
    const userTicketingData = yield call(
      api.addUserTicketing,
      token,
      movieCode,
      movieName,
      posterUrl,
      viewGradeCode,
      divisionCode,
      detailDivisionCode,
      cinemaId,
      cinemaName,
      screenId,
      screenName,
      screenDivisionCode,
      screenDivisionName,
      playSequence,
      playDate,
      playDay,
      startTime,
      endTime,
      seatNoList,
      price
    );
    yield put({
      type: ADD_USER_TICKETING_SUCCESS,
      payload: userTicketingData.userTicketing,
    });
    yield put(
      setUser({
        ...user,
        ticketingList: [
          ...user.ticketingList,
          userTicketingData.userTicketing.ticketingId,
        ],
      })
    );
    yield put(
      getPlaySeqs({
        playDate,
        divisionCode,
        detailDivisionCode,
        cinemaId,
      })
    );
    yield put(
      getSeats({
        cinemaId,
        screenId,
        playDate,
        playSequence,
        screenDivisionCode,
      })
    );
  } catch (e) {
    yield put({
      type: ADD_USER_TICKETING_ERROR,
      payload: e,
    });
  }
}

// watcher saga
export function* userTicketingSaga() {
  yield takeLatest(GET_USER_TICKETING_LIST, getUserTicketingSaga);
  yield takeLatest(ADD_USER_TICKETING, addUserTicketingSaga);
}

// initial state
const initialState = {
  userTicketingList: {
    loading: false,
    data: null,
    error: null,
  },
  userTicketing: {
    loading: false,
    data: null,
    error: null,
  },
};

// reducer
export default function userTicketingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_TICKETING_LIST:
      return {
        ...state,
        userTicketingList: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_USER_TICKETING_LIST_SUCCESS:
      return {
        ...state,
        userTicketingList: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case GET_USER_TICKETING_LIST_ERROR:
      return {
        ...state,
        userTicketingList: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };
    case ADD_USER_TICKETING:
      return {
        ...state,
        userTicketing: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case ADD_USER_TICKETING_SUCCESS:
      return {
        ...state,
        userTicketing: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case ADD_USER_TICKETING_ERROR:
      return {
        ...state,
        userTicketing: {
          loading: false,
          data: null,
          error: action.paylod,
        },
      };
    default:
      return state;
  }
}
