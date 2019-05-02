import { JOIN_GAME, GAME } from '../actions';
import { wrapReducer } from '../helpers';

const defaultState = {
  enabled: false,
  connection: false,
  gameId: null,
};

const startReducer = wrapReducer(JOIN_GAME.START, (state, { payload: { gameId } }) => ({
  ...defaultState,
  enabled: true,
  gameId
}));

const cancelReducer = wrapReducer(JOIN_GAME.CANCEL, () => (defaultState));

const registerReducer = wrapReducer(JOIN_GAME.CONNECT, state => ({
  ...state,
  connection: true,
}));

const registeredReducer = wrapReducer(GAME.CREATED, () => (defaultState));


export default function (state, action) {
  return startReducer(state, action)
        || cancelReducer(state, action)
             || registerReducer(state, action)
        || registeredReducer(state, action)
        || state
        || defaultState;
}
