import { NEW_GAME, GAME } from '../actions';
import { wrapReducer } from '../helpers';

const defaultState = {
  enabled: false,
  nickName: '',
  playersCount: '',
  isValid: false,
  registration: false,
};

const startReducer = wrapReducer(NEW_GAME.START, () => ({
  ...defaultState,
  enabled: true,
}));

const cancelReducer = wrapReducer(NEW_GAME.CANCEL, state => ({
  ...state,
  enabled: false,
}));

const updateReducer = wrapReducer(NEW_GAME.UPDATE, (state, { payload }) => {
  const result = {
    ...state,
    ...payload,
  };

  const playersCount = parseInt(result.playersCount, 10);

  result.isValid = !isNaN(playersCount)
        && playersCount > 1
        && result.nickName.trim().length > 0;

  return result;
});

const registerReducer = wrapReducer(NEW_GAME.REGISTER, state => ({
  ...state,
  registration: true,
}));

const registeredReducer = wrapReducer(GAME.CREATED, state => ({
  ...state,
  enabled: false,
  registration: false
}));


export default function (state, action) {
  return startReducer(state, action)
        || updateReducer(state, action)
        || cancelReducer(state, action)
        || registerReducer(state, action)
        || registeredReducer(state, action)
        || state
        || defaultState;
}
