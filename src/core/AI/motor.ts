import { MODE } from "../gamestatus/gamestatus.model";
import { getOpenAIMove } from "./api/chatgpt-openai.api";
import { Play, TYPE } from "./ai.model";

export const OpenAIMove = async (squares: string[]): Promise<number> => {
	let play: Play = {
		index: 0,
		type: "",
	};
	play.index = await getOpenAIMove(squares);
	if (play.index > 8 || squares[play.index] !== null) {
		play = lookingForWinning(squares);
		if (play.type !== TYPE.WIN) {
			play = lookingForBlocking(squares);
		}
		if (play.type !== TYPE.WIN && play.type !== TYPE.BLOCK) {
			play.index = AINoobMove(squares);
		}
	}

	return play.index;
};

export const AIMove = (currentGameMode: string, squares: string[]): number => {
	switch (currentGameMode) {
		case MODE.AI_MEDIUM:
			return AIMediumMove(squares);
		case MODE.AI_EASY:
			return AIEasyMove(squares);
		case MODE.AI_NOOB:
			return AINoobMove(squares);
		default:
			return AINoobMove(squares);
	}
};

const AINoobMove = (squares: string[]): number => {
	let emptyIndexes: number[] = [];
	for (let i = 0; i < squares.length; i++) {
		if (squares[i] === null) {
			emptyIndexes.push(i);
		}
	}
	const randomPlay = Math.floor(Math.random() * (emptyIndexes.length - 0));

	return emptyIndexes[randomPlay];
};

const AIEasyMove = (squares: string[]): number => {
	let play: Play = {
		index: 0,
		type: "",
	};
	play = lookingForWinning(squares);

	if (play.type !== TYPE.WIN) {
		play.index = AINoobMove(squares);
	}

	return play.index;
};

const AIMediumMove = (squares: string[]): number => {
	let play: Play = {
		index: 0,
		type: "",
	};
	play = lookingForWinning(squares);

	if (play.type !== TYPE.WIN) {
		play = lookingForBlocking(squares);
	}

	if (play.type !== TYPE.WIN && play.type !== TYPE.BLOCK) {
		play.index = AINoobMove(squares);
	}

	return play.index;
};

const lookingForWinning = (squares: string[]): Play => {
	let play: Play = {
		index: 0,
		type: "",
	};

	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (
			(squares[a] === "〇" && squares[b] === "〇") ||
			(squares[a] === "〇" && squares[c] === "〇") ||
			(squares[b] === "〇" && squares[c] === "〇")
		) {
			if (squares[a] === null) {
				play.index = a;
				play.type = TYPE.WIN;
				break;
			} else if (squares[b] === null) {
				play.index = b;
				play.type = TYPE.WIN;
				break;
			} else if (squares[c] === null) {
				play.index = c;
				play.type = TYPE.WIN;
				break;
			}
		}
	}

	return play;
};

const lookingForBlocking = (squares: string[]): Play => {
	let play: Play = {
		index: 0,
		type: "",
	};

	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (
			(squares[a] === "✕" && squares[b] === "✕") ||
			(squares[a] === "✕" && squares[c] === "✕") ||
			(squares[b] === "✕" && squares[c] === "✕")
		) {
			if (squares[a] === null) {
				play.index = a;
				play.type = TYPE.BLOCK;
				break;
			} else if (squares[b] === null) {
				play.index = b;
				play.type = TYPE.BLOCK;
				break;
			} else if (squares[c] === null) {
				play.index = c;
				play.type = TYPE.BLOCK;
				break;
			}
		}
	}

	return play;
};
