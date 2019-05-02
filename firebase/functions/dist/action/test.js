"use strict";

const {
  calculateScores
} = require('./helpers');

console.log(calculateScores([{
  player: 'r',
  rivalDigit: 'even',
  myDigit: 0
}, {
  player: 's',
  rivalDigit: 'even',
  myDigit: 1
}, {
  player: 'r',
  rivalDigit: 'even',
  myDigit: 2
}, {
  player: 's',
  rivalDigit: 'even',
  myDigit: 3
}, {
  player: 'd',
  rivalDigit: 'odd',
  myDigit: 3
}, {
  player: 'r',
  rivalDigit: 'even',
  myDigit: 4
}, {
  player: 's',
  rivalDigit: 'odd',
  myDigit: 5
}, {
  player: 'r',
  rivalDigit: 'odd',
  myDigit: 6
}]));