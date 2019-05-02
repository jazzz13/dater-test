import { all } from 'redux-saga/effects';
import gamesSaga from './games';
import registerNewGameSaga from './registerNewGame';
import joinToGameSaga from './joinToGame';
import gameSaga from './game';

export default function* rootSaga() {
  yield all([
    gamesSaga(),
    registerNewGameSaga(),
    joinToGameSaga(),
    gameSaga(),
  ]);
}
