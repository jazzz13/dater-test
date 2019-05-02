// @flow

type StateEnum = 'awaiting' | 'play' | 'finished';

export type PlayerType = {
    name: string,

    score: number
}

export type ActionType = {
    player: string,
    rivalDigit: string,
    myDigit: number
}

export type GameType = {
    author: string,
    playersCount: number,
    currentPlayer: string | null,
    winner: string | null,
    actions: ActionType[],
    players: PlayerType[],
    state: StateEnum,
    createdAt: Date
}


export type AddGameRequestType = {
    author: string,
    playersCount: string
}

export type JoinGameRequestType = {
    nickName: string,
    gameId: string
}

export type ActionRequestType = {
    player: string,
    gameId: string,
    rivalDigit: string,
    myDigit: string,
}
