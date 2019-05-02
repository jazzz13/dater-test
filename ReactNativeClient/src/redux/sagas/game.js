import { eventChannel } from 'redux-saga';
import firebase from 'react-native-firebase';
import {
  take, put, call, takeEvery
} from 'redux-saga/effects';
import { GAME } from '../actions';

const FUNCTION_NAME = 'action';
const GAMES_COLLECTION = 'games';

let currentGameStream = null;

function* makeAction({ payload }) {
  const actionFunction = firebase.functions().httpsCallable(FUNCTION_NAME);

  yield call(() => actionFunction(payload));
}


function gameUpdates(id) {
  return eventChannel((emitter) => {
    const gameDocumentReference = firebase.firestore().doc(`${GAMES_COLLECTION}/${id}`);

    return gameDocumentReference.onSnapshot((data) => {
      emitter(data);
    });
  });
}

function* subscribeGame({ payload: { id } }) {
  currentGameStream = yield call(gameUpdates, id);

  while (true) {
    const snapshot = yield take(currentGameStream);
    yield put(GAME.UPDATED(snapshot.data()));
  }
}

function unsubscribeGame() {
  if (currentGameStream) {
    currentGameStream.close();
    currentGameStream = null;
  }
}

export default function* () {
  yield takeEvery(GAME.ACTION, makeAction);
  yield takeEvery(GAME.CREATED, subscribeGame);
  yield takeEvery(GAME.EXIT, unsubscribeGame);
}
