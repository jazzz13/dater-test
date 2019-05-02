import { combineReducers } from 'redux';
import gamesReducer from './gamesReducer';
import newGameReducer from './newGameReducer';
import joinGameReducer from './joinGameReducer';
import gameReducer from './gameReducer';

const reducers = combineReducers({
  games: gamesReducer,
  newGame: newGameReducer,
  joinGame: joinGameReducer,
  game: gameReducer,
});

export default reducers;
