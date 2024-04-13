import React from "react"
import classes from "./container-infoTurn.component.module.css"
import { availableSquares, calculateWinner, statusClasses } from "./helpers";

interface Props {
	infoSquares: string[];
	turn: boolean;
	onClick: () => void;
}

export const ContainerInfoTurn: React.FC<Props> = (props) => {
    const {infoSquares: squares, turn, onClick: restartGame} = props;

    const winner = calculateWinner(squares);
    const available = availableSquares(squares);
    const status = printStatus({available,winner,turn});

    return (
        <div className={classes.containerInfoTurn}>
			{status}
			<p
				className={
					winner || !available
						? `${classes.buttonRestart}`
						: `${classes.buttonRestartHidden}`
				}
				onClick={restartGame}
			>
				⟳
			</p>
		</div>
    )
}

interface GameInfo {
	available: boolean,
	winner: string | null,
	turn: boolean
}

const printStatus = (gameInfo: GameInfo):JSX.Element => {
	let status;
	const {available, winner, turn} = gameInfo;

	if(available) {
		(turn)
		? (status = (<p className={statusClasses.classXsTurn}>Player Turn: {turn ? "✕'s" : "〇's"}</p>))
		: (status = (<p className={statusClasses.classOsTurn}>Player Turn: {turn ? "✕'s" : "〇's"}</p>))
	} else {
		status = <p className={statusClasses.classXsWon}>¡Draw!</p>
	}

	if(winner) {
		(turn)
		? (status = <p className={statusClasses.classXsWon}>{winner}'s WON!</p>)
		: (status = <p className={statusClasses.classOsWon}>{winner}'s WON!</p>)
	}

	return status;
}