import { takeLatest, call, put } from 'redux-saga/effects';
import * as api from '../api';

// action type
const GET_PLAY_SEQS = 'GET_PLAY_SEQS';
const GET_PLAY_SEQS_SUCCESS = 'GET_PLAY_SEQS_SUCCESS';
const GET_PLAY_SEQS_ERROR = 'GET_PLAY_SEQS_ERROR';

// action creator
export const getPlaySeqs = ({
  playDate,
  divisionCode,
  detailDivisionCode,
  cinemaId,
  movieCode,
}) => ({
  type: GET_PLAY_SEQS,
  payload: {
    playDate,
    divisionCode,
    detailDivisionCode,
    cinemaId,
    movieCode,
  },
});

// worker saga
function* getPlaySeqsSaga(action) {
  const {
    playDate,
    divisionCode,
    detailDivisionCode,
    cinemaId,
    movieCode,
  } = action.payload;
  try {
    const playSeqs = yield call(
      api.getPlaySequence,
      playDate,
      divisionCode,
      detailDivisionCode,
      cinemaId,
      movieCode
    );
    yield put({
      type: GET_PLAY_SEQS_SUCCESS,
      payload: playSeqs,
    });
  } catch (e) {
    yield put({
      type: GET_PLAY_SEQS_ERROR,
      payload: e,
    });
  }
}

// watcher saga
export function* playSeqsSaga() {
  yield takeLatest(GET_PLAY_SEQS, getPlaySeqsSaga);
}

// initial state
const initialState = {
  loading: false,
  data: null,
  error: null,
};

// reducer
export default function playSeqsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLAY_SEQS:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case GET_PLAY_SEQS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_PLAY_SEQS_ERROR:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
}
