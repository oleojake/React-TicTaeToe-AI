import React, { useEffect } from "react";
import classes from "./board.component.module.css";
import { Square } from "./square.component";
import { calculateWinner } from "./helpers";
import { ContainerInfoTurn } from "./container-infoTurn.component";
import { isIAPlaying, isIATurn } from "../core/gamestatus/motor";
import { IAMove, OpenIAMove } from "../core/IA/motor";
import { MODE } from "../core/gamestatus";

interface Props {
	currentGameMode: string;
}

export const Board: React.FC<Props> = (props) => {
	const [turn, setTurn] = React.useState(true);
	const [squares, setSquares] = React.useState(Array(9).fill(null));
	const { currentGameMode } = props;

	useEffect(() => {
		if (isIAPlaying(currentGameMode) && isIATurn(turn)) {
			if (currentGameMode === MODE.IA_CHATGPT) {
				const fetchData = async () => {
					try {
						const squareIndex = await OpenIAMove(squares);
						handlePlay(squareIndex);
					} catch (error) {
						console.error(error);
					}
				};
				fetchData();
			} else {
				const squareIndex = IAMove(currentGameMode, squares);
				setTimeout(() => {
					handlePlay(squareIndex);
				}, 300);
			}
		}
	}, [turn]);

	useEffect(() => {
		restartGame();
	}, [currentGameMode]);

	const restartGame = () => {
		const nextSquares = Array(9).fill(null);
		setSquares(nextSquares);
		setTurn(true);
	};

	const handlePlay = (id: number) => {
		if (squares[id] || calculateWinner(squares)) {
			return;
		}

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
					<Square
						currentGameMode={currentGameMode}
						key={index}
						id={index}
						value={square}
						turn={turn}
						onClick={handlePlay}
					/>
				))}
			</div>
			<ContainerInfoTurn infoSquares={squares} turn={turn} onClick={restartGame} />
		</>
	);
};
