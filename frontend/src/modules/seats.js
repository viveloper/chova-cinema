import { takeLatest, call, put } from 'redux-saga/effects';
import * as api from '../api';

// action type
const GET_SEATS = 'GET_SEATS';
const GET_SEATS_SUCCESS = 'GET_SEATS_SUCCESS';
const GET_SEATS_ERROR = 'GET_SEATS_ERROR';

// action creator
export const getSeats = (params) => ({ type: GET_SEATS, payload: params });

// worker saga
function* getSeatsSaga(action) {
  const {
    cinemaId,
    screenId,
    playDate,
    playSequence,
    screenDivisionCode,
  } = action.payload;
  try {
    const seats = yield call(
      api.getSeats,
      cinemaId,
      screenId,
      playDate,
      playSequence,
      screenDivisionCode
    );
    yield put({
      type: GET_SEATS_SUCCESS,
      payload: seats,
    });
  } catch (e) {
    yield put({
      type: GET_SEATS_ERROR,
      payload: e,
    });
  }
}

// watcher saga
export function* seatsSaga() {
  yield takeLatest(GET_SEATS, getSeatsSaga);
}

// initial state
const initialState = {
  loading: false,
  data: null,
  error: null,
};

// reducer
export default function seatsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SEATS:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case GET_SEATS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_SEATS_ERROR:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
}
