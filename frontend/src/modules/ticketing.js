import { takeLatest, call, put } from 'redux-saga/effects';
import * as api from '../api';

// action type
const GET_TICKETING_INFO = 'GET_TICKETING_INFO';
const GET_TICKETING_INFO_SUCCESS = 'GET_TICKETING_INFO_SUCCESS';
const GET_TICKETING_INFO_ERROR = 'GET_TICKETING_INFO_ERROR';
const SET_SELECTED_CINEMA = 'SET_SELECTED_CINEMA';

// action creator
export const getTicketingInfo = () => ({ type: GET_TICKETING_INFO });
export const setSelectedCinema = (cinemaId) => ({
  type: SET_SELECTED_CINEMA,
  payload: cinemaId,
});

// worker saga
function* getTicketingInfoSaga() {
  try {
    const ticketingInfo = yield call(api.getTicketingInfo);
    yield put({
      type: GET_TICKETING_INFO_SUCCESS,
      payload: ticketingInfo,
    });
  } catch (e) {
    yield put({
      type: GET_TICKETING_INFO_ERROR,
      payload: e,
    });
  }
}

// watcher saga
export function* ticketingSaga() {
  yield takeLatest(GET_TICKETING_INFO, getTicketingInfoSaga);
}

// initial state
const initialState = {
  loading: false,
  data: null,
  error: null,
};

// reducer
export default function ticketingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TICKETING_INFO:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case GET_TICKETING_INFO_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_TICKETING_INFO_ERROR:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    case SET_SELECTED_CINEMA:
      return {
        loading: false,
        data: {
          ...state.data,
          Cinemas: {
            ...state.data.Cinemas,
            SelectedCinema: action.payload,
          },
        },
        error: null,
      };
    default:
      return state;
  }
}
