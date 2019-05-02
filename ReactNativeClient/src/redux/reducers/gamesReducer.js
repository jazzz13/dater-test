import { GAMES } from '../actions';
import { wrapReducer } from '../helpers';

const defaultState = {
  items: [],
  isLoading: false,
};

const requestReducer = wrapReducer(GAMES.REQUEST, state => ({
  ...state,
  isLoading: true,
}));

const updatedReducer = wrapReducer(GAMES.UPDATED, (state, { payload }) => ({
  ...state,
  isLoading: false,
  items: payload.documents.map(doc => ({
    ...doc.data(),
    id: doc.id,
  }))
}));

export default function (state, action) {
  return requestReducer(state, action)
        || updatedReducer(state, action)
        || state
        || defaultState;
}
