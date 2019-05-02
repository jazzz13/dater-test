import { GAME } from '../actions';
import { wrapReducer } from '../helpers';

const defaultAnswer = {
  rivalDigit: '',
  myDigit: '',
};

const defaultState = {
  id: null,
  action: false,
  player: null,
  myAction: false,
  notActions: true,
  answer: defaultAnswer,
  gameData: {},
};

const createdReducer = wrapReducer(GAME.CREATED, (state, { payload }) => ({
  ...state,
  ...payload
}));

const actionReducer = wrapReducer(GAME.ACTION, state => ({
  ...state,
  action: true
}));

const updateReducer = wrapReducer(GAME.UPDATE, (state, { payload: { rivalDigit, myDigit } }) => ({
  ...state,
  answer: {
    rivalDigit: rivalDigit || state.answer.rivalDigit,
    myDigit: myDigit !== undefined ? myDigit : state.answer.myDigit,
  },
}));

const updatedReducer = wrapReducer(GAME.UPDATED, (state, { payload: gameData }) => ({
  ...state,
  action: false,
  myAction: gameData.currentPlayer === state.player,
  notActions: gameData.actions.length === 0,
  answer: defaultAnswer,
  gameData,

}));

const exitReducer = wrapReducer(GAME.EXIT, () => defaultState);

export default function (state, action) {
  return createdReducer(state, action)
        || actionReducer(state, action)
        || updateReducer(state, action)
        || updatedReducer(state, action)
        || exitReducer(state, action)
        || state
        || defaultState;
}
