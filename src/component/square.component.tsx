import React from "react";
import classes from "./square.component.module.css";
import { isIAPlaying, isPlayerTurn } from "../core/gamestatus"


interface Props {
	id: number;
	value: string | null;
	onClick: (id: number) => void;
	turn: boolean;
	currentGameMode:string;
}

export const Square: React.FC<Props> = (props) => {
	const {id, value, onClick, turn, currentGameMode} = props;
	
	const handleClick = () => {
		if((!isIAPlaying(currentGameMode)) || (isIAPlaying(currentGameMode) && isPlayerTurn(turn))){
			onClick(id);
		}
	};

	return (
		<button
			onClick={()=> {handleClick()}}
			className={
				value === null
					? `${classes.square} ${classes.emptySquare}`
					: value === "✕"
						? `${classes.square} ${classes.notEmptySquare} ${classes.x}`
						: `${classes.square} ${classes.notEmptySquare} ${classes.o}`
			}
		>
			<span>{value}</span>
		</button>
	);
};