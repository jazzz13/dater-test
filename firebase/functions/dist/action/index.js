"use strict";

const functions = require('firebase-functions/lib/index');

const admin = require('firebase-admin/lib/index');

const {
  GAMES_COLLECTION,
  ROUNDS_COUNT,
  FINISHED_STATE
} = require('../const');

const {
  httpMethodsWrap,
  checkTypeParam
} = require('../helpers');

const {
  nextPlayerName,
  calculateScores,
  selectWinners
} = require('./helpers');

module.exports = functions.https.onRequest(httpMethodsWrap(async (req, res) => {
  const {
    player,
    gameId,
    rivalDigit,
    myDigit
  } = req.body.data;
  checkTypeParam(player, 'string', 'player');
  checkTypeParam(gameId, 'string', 'gameId');
  checkTypeParam(myDigit, 'string', 'myDigit');
  const gameDocumentRef = admin.firestore().doc(`${GAMES_COLLECTION}/${gameId}`);
  const gameSnapshot = await gameDocumentRef.get();
  const updatedGame = Object.assign({}, gameSnapshot.data());
  updatedGame.actions = updatedGame.actions.concat({
    player,
    rivalDigit,
    myDigit: parseInt(myDigit, 10)
  });
  updatedGame.players = calculateScores(updatedGame);
  updatedGame.currentPlayer = nextPlayerName(updatedGame);
  const roundsCount = (updatedGame.actions.length - 1) / updatedGame.playersCount;

  if (roundsCount >= ROUNDS_COUNT && roundsCount === parseInt(roundsCount, 10)) {
    const winners = selectWinners(updatedGame.players);

    if (winners.length === 1) {
      updatedGame.winner = winners[0].name;
      updatedGame.currentPlayer = null;
      updatedGame.state = FINISHED_STATE;
    }
  }

  await gameDocumentRef.update(updatedGame);
  res.send({
    data: {
      success: true
    }
  });
}));