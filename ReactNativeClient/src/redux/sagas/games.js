import { eventChannel } from 'redux-saga';
import firebase from 'react-native-firebase';
import {
  take, put, call, takeEvery, delay
} from 'redux-saga/effects';
import { GAMES } from '../actions';

const GAMES_COLLECTION = 'games';
const LOADING_MIN_DELAY = 500;

let isFirstUpdate = true;

function gamesUpdates() {
  return eventChannel((emitter) => {
    const gamesCollection = firebase.firestore().collection(GAMES_COLLECTION);

    return gamesCollection.orderBy('createdAt', 'desc').onSnapshot((data) => {
      emitter(data);
    });
  });
}

function* subscribeGame() {
  const gamesStream = yield call(gamesUpdates);

  while (true) {
    const snapshot = yield take(gamesStream);

    if (isFirstUpdate) {
      yield delay(LOADING_MIN_DELAY); // enjoyment of spinner
      isFirstUpdate = false;
    }

    yield put(GAMES.UPDATED({ documents: snapshot.docs }));
  }
}

export default function* () {
  yield takeEvery(GAMES.REQUEST, subscribeGame);
}
