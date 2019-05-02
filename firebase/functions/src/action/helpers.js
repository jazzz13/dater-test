// @flow

import type { PlayerType, ActionType } from '../types';

type NextPlayerNameArgsType = {
    players: PlayerType[],
    currentPlayer: string | null
}

type CalculateScoresArgsType = {
    actions: ActionType[],
    players: PlayerType[],
}

exports.nextPlayerName = ({ players, currentPlayer }: NextPlayerNameArgsType): string => {
  const currentIndex = players.findIndex(player => currentPlayer === player.name);

  const resultIndex = currentIndex === players.length - 1 ? 0 : currentIndex + 1;

  return players[resultIndex].name;
};


exports.calculateScores = ({ actions, players }: CalculateScoresArgsType): PlayerType[] => {
  const scores = {};

  let previousAction = null;

  actions.forEach((action) => {
    if (!scores[action.player]) {
      scores[action.player] = 0;
    }

    if (previousAction) {
      const eventAnswer = action.rivalDigit === 'even';

      const rightAnswer = eventAnswer === (previousAction.myDigit % 2 === 0);

      if (rightAnswer) {
        scores[action.player] += 1;
      }
    }

    previousAction = action;
  });

  return players.map(player => Object.assign({}, player, { score: scores[player.name] || 0 }));
};

exports.selectWinners = (players: PlayerType[]): PlayerType[] => {
  const sortedPlayers = players.slice().sort((a, b) => (b.score - a.score));

  const maxScore = sortedPlayers[0].score;

  return players.filter(({ score }) => (score === maxScore));
};
