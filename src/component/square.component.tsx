import React from "react";
import classes from "./square.component.module.css";
import { isIAPlaying, isPlayerTurn } from "../core/motor";


interface Props {
	id: number;
	value: string | null;
	onClick: (id: number) => void;
	turn: boolean;
	currentGameMode:string;
}

export const Square: React.FC<Props> = (props) => {
	const handleClick = () => {
		if(!isIAPlaying(props.currentGameMode)){
			props.onClick(props.id);
		}
		if(isIAPlaying(props.currentGameMode) && isPlayerTurn(props.turn)){
			props.onClick(props.id);
		}
	};



	return (
		<button
			onClick={()=> {handleClick()}}
			className={
				props.value === null
					? `${classes.square} ${classes.emptySquare}`
					: props.value === "✕"
						? `${classes.square} ${classes.notEmptySquare} ${classes.x}`
						: `${classes.square} ${classes.notEmptySquare} ${classes.o}`
			}
		>
			<span>{props.value}</span>
		</button>
	);
};