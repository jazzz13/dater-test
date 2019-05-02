export const stateDescription = ({ state, currentPlayer }, im) => {
  if (state === 'waiting') {
    return 'Ожидание игроков...';
  }

  if (state === 'play') {
    if (currentPlayer === im) {
      return 'Ваш ход!';
    }

    return `Играем! Ход ${currentPlayer}`;
  }

  if (state === 'finished') {
    return 'Игра завершена';
  }

  return '';
};
