// @flow

import type { JoinGameRequestType, GameType } from '../types';

const functions = require('firebase-functions/lib/index');
const admin = require('firebase-admin/lib/index');
const { GAMES_COLLECTION, PLAY_STATE } = require('../const');
const { httpMethodsWrap, checkTypeParam } = require('../helpers');

module.exports = functions.https.onRequest(httpMethodsWrap(async (req, res) => {
  const { nickName, gameId } = (req.body.data: JoinGameRequestType);

  checkTypeParam(nickName, 'string', 'nickName');
  checkTypeParam(gameId, 'string', 'gameId');

  const gameDocumentRef = admin.firestore().doc(`${GAMES_COLLECTION}/${gameId}`);
  const gameSnapshot = await gameDocumentRef.get();

  const updatedGame: GameType = Object.assign({}, gameSnapshot.data());

  updatedGame.players.push({
    name: nickName,
    score: 0,
  });

  if (updatedGame.playersCount === updatedGame.players.length) {
    updatedGame.state = PLAY_STATE;
    updatedGame.currentPlayer = updatedGame.players[0].name;
  }

  await gameDocumentRef.update(updatedGame);

  res.send({ data: { success: true } });
}));
