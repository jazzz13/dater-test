import { wrapAction } from './helpers';


export const GAMES = {
  REQUEST: wrapAction('games_request'),
  UPDATED: wrapAction('games_updated'),
};

export const NEW_GAME = {
  START: wrapAction('new_game_start'),
  CANCEL: wrapAction('new_game_cancel'),
  UPDATE: wrapAction('new_game_update'),
  REGISTER: wrapAction('new_game_register'),
};

export const JOIN_GAME = {
  START: wrapAction('join_game_start'),
  CANCEL: wrapAction('join_game_cancel'),
  CONNECT: wrapAction('join_game_connect'),
};

export const GAME = {
  CREATED: wrapAction('game_created'),
  ACTION: wrapAction('game_action'),
  UPDATE: wrapAction('game_update'),
  UPDATED: wrapAction('game_updated'),
  EXIT: wrapAction('game_exit'),
};
