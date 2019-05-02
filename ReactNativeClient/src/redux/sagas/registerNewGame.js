import { put, takeEvery, call } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import { NEW_GAME, GAME } from '../actions';

const FUNCTION_NAME = 'addGame';

function* registerGame({ payload: { nickName, playersCount } }) {
  const addGameFunction = firebase.functions().httpsCallable(FUNCTION_NAME);

  const { data } = yield call(() => addGameFunction({ author: nickName, playersCount }));

  yield put(GAME.CREATED({ id: data.id, player: nickName }));
}

export default function* () {
  yield takeEvery(NEW_GAME.REGISTER, registerGame);
}
