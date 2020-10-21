import { takeEvery, getContext } from 'redux-saga/effects';

const REDIRECT_PATH = 'REDIRECT_PATH';

export const redirectPath = (path) => ({
  type: REDIRECT_PATH,
  payload: path,
});

function* redirectPathSaga(action) {
  const history = yield getContext('history');
  history.push(action.payload);
}

export function* browserHistorySaga() {
  yield takeEvery(REDIRECT_PATH, redirectPathSaga);
}
