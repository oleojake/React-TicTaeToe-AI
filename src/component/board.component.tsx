import React from "react";
import classes from "./board.component.module.css";
import { Square } from "./square.component";
import { calculateWinner } from "./helpers";
import { ContainerInfoTurn } from "./container-infoTurn.component";

export const Board: React.FC = () => {
	const [turn, setTurn] = React.useState(true);
	const [squares, setSquares] = React.useState(Array(9).fill(null));

	const restartGame = () => {
		const nextSquares = Array(9).fill(null);
		setSquares(nextSquares);
		setTurn(true);
	};

	const handlePlay = (id: number) => {
		if (squares[id] || calculateWinner(squares)) {return;}

		const nextSquares = squares.slice();
		turn ? (nextSquares[id] = "✕") : (nextSquares[id] = "〇");

		setSquares(nextSquares);
		setTurn(!turn);
	};

	return (
		<>
			<h1 className={classes.header}>React TicTaeToe</h1>
			<div className={classes.boardContainer}>
				{squares.map((square, index) => (
					<Square key={index} id={index} value={square} onClick={handlePlay} />
				))}
			</div>
			<ContainerInfoTurn infoSquares={squares} turn={turn} onClick={restartGame} />
		</>
	);
};
