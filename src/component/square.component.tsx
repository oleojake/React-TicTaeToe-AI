import React from "react";
import classes from "./square.component.module.css";

interface Props {
	id: number;
	value: string | null;
	onClick: (id: number) => void;
}

export const Square: React.FC<Props> = (props) => {
	const handleClick = () => {
		props.onClick(props.id);
	};

	return (
		<button
			onClick={handleClick}
			className={
				props.value === "✕"
					? `${classes.square} ${classes.x}`
					: `${classes.square} ${classes.o}`
			}
		>
			<span>{props.value}</span>
		</button>
	);
};