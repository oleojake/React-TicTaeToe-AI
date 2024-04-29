import classes from "./top-menu.component.module.css";
import { MODE } from "../../core/gamestatus";
import { API_KEY } from "../../core/AI/api/chatgpt-openai.api";

interface Props {
	currentGameMode: string;
	changeCurrentGameMode(mode: string): void;
}

export const TopMenu: React.FC<Props> = (props) => {
	const { currentGameMode, changeCurrentGameMode } = props;

	const handleClick = (mode: string) => {
		changeCurrentGameMode(mode);
	};

	return (
		<div className={classes.topMenu}>
			<button
				onClick={() => handleClick(MODE.PvP)}
				className={currentGameMode === MODE.PvP ? `${classes.active}` : ``}
			>
				1vs1
			</button>
			<p>AI:</p>
			<button
				onClick={() => handleClick(MODE.AI_NOOB)}
				className={currentGameMode === MODE.AI_NOOB ? `${classes.active}` : ``}
			>
				Noob
			</button>
			<button
				onClick={() => handleClick(MODE.AI_EASY)}
				className={currentGameMode === MODE.AI_EASY ? `${classes.active}` : ``}
			>
				Easy
			</button>
			<button
				onClick={() => handleClick(MODE.AI_MEDIUM)}
				className={currentGameMode === MODE.AI_MEDIUM ? `${classes.active}` : ``}
			>
				Medium
			</button>
			<button
				onClick={() => handleClick(MODE.AI_CHATGPT)}
				className={
					API_KEY === null
						? `${classes.disabled}`
						: currentGameMode === MODE.AI_CHATGPT
						? `${classes.active}`
						: ``
				}
				disabled={API_KEY === null}
			>
				{" "}
				ChatGPT
			</button>
		</div>
	);
};
