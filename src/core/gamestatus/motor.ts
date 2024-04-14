import { MODE } from "./gamestatus.model"

export const isIAPlaying = (mode:string) => {
    return (mode !== MODE.PvP)
        ? true
        : false
}

export const isIATurn = (turn: boolean) => {
    return (!turn)
        ? true
        : false
}

export const isPlayerTurn = (turn: boolean) => {
    return (turn)
        ? true
        : false
}
