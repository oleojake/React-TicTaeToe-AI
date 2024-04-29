import { MODE } from "./gamestatus.model"

export const isAIPlaying = (mode:string) => {
    return (mode !== MODE.PvP)
        ? true
        : false
}

export const isAITurn = (turn: boolean) => {
    return (!turn)
        ? true
        : false
}

export const isPlayerTurn = (turn: boolean) => {
    return (turn)
        ? true
        : false
}
