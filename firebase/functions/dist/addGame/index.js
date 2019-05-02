"use strict";

const functions = require('firebase-functions/lib/index');

const admin = require('firebase-admin/lib/index');

const {
  GAMES_COLLECTION,
  WAITING_STATE
} = require('../const');

const {
  httpMethodsWrap,
  checkTypeParam
} = require('../helpers');

module.exports = functions.https.onRequest(httpMethodsWrap(async (req, res) => {
  const {
    author,
    playersCount
  } = req.body.data;
  checkTypeParam(author, 'string', 'author');
  checkTypeParam(playersCount, 'string', 'playersCount');
  const newGame = {
    author,
    playersCount: parseInt(playersCount, 10),
    currentPlayer: null,
    winner: null,
    actions: [],
    players: [{
      name: author,
      score: 0
    }],
    state: WAITING_STATE,
    createdAt: new Date()
  };
  const result = await admin.firestore().collection(GAMES_COLLECTION).add(newGame);
  res.send({
    data: {
      id: result.id
    }
  });
}));