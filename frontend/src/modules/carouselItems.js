import { takeLatest, call, put } from 'redux-saga/effects';
import * as api from '../api';

const GET_CAROUSEL_ITEMS = 'GET_CAROUSEL_ITEMS';
const GET_CAROUSEL_ITEMS_SUCCESS = 'GET_CAROUSEL_ITEMS_SUCCESS';
const GET_CAROUSEL_ITEMS_ERROR = 'GET_CAROUSEL_ITEMS_ERROR';

export const getCarouselItems = () => ({ type: GET_CAROUSEL_ITEMS });

function* getCarouselItemsSaga() {
  try {
    const data = yield call(api.getCarouselItems);
    yield put({
      type: GET_CAROUSEL_ITEMS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: GET_CAROUSEL_ITEMS_ERROR,
      payload: e,
      error: true,
    });
  }
}

export function* carouselItemsSaga() {
  yield takeLatest(GET_CAROUSEL_ITEMS, getCarouselItemsSaga);
}

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const carouselReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CAROUSEL_ITEMS:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case GET_CAROUSEL_ITEMS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_CAROUSEL_ITEMS_ERROR:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default carouselReducer;
