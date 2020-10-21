import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import carouselItemsReducer, { carouselItemsSaga } from './carouselItems';
import moviesReducer, { moviesSaga } from './movies';
import movieReducer, { movieSaga } from './movie';
import ticketingReducer, { ticketingSaga } from './ticketing';
import playSeqsReducer, { playSeqsSaga } from './playSeqs';
import seatsReducer, { seatsSaga } from './seats';
import { browserHistorySaga } from './browserHistory';
import loginReducer, { loginSaga } from './login';
import userTicketingReducer, { userTicketingSaga } from './userTicketing';

export function* rootSaga() {
  yield all([
    carouselItemsSaga(),
    moviesSaga(),
    movieSaga(),
    ticketingSaga(),
    playSeqsSaga(),
    seatsSaga(),
    userTicketingSaga(),
    browserHistorySaga(),
    loginSaga(),
  ]);
}

const rootReducer = combineReducers({
  carouselItems: carouselItemsReducer,
  movies: moviesReducer,
  movie: movieReducer,
  ticketing: ticketingReducer,
  playSeqs: playSeqsReducer,
  seats: seatsReducer,
  userTicketing: userTicketingReducer,
  login: loginReducer,
});

export default rootReducer;
