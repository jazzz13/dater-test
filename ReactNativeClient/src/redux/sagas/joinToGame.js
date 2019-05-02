import { put, takeEvery, call } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import { GAME, JOIN_GAME } from '../actions';

const FUNCTION_NAME = 'joinGame';

function* joinToGame({ payload: { nickName, gameId } }) {
  const addGameFunction = firebase.functions().httpsCallable(FUNCTION_NAME);

  yield call(() => addGameFunction({ nickName, gameId }));

  yield put(GAME.CREATED({ id: gameId, player: nickName }));
}

export default function* () {
  yield takeEvery(JOIN_GAME.CONNECT, joinToGame);
}
