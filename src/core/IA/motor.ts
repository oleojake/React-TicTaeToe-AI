import { MODE } from "../gamestatus/gamestatus.model";
import { Play, TYPE } from "./ia.model";

export const IAMove = (currentGameMode:string, squares: string[]) : number => {

    switch(currentGameMode){
        case MODE.IA_CHATGPT:
            return IANoobMove(squares);
        case MODE.IA_MEDIUM:
            return IAMediumMove(squares);
        case MODE.IA_EASY:
            return IAEasyMove(squares);
        case MODE.IA_NOOB:
            return IANoobMove(squares);
        default: 
            return IANoobMove(squares);
        }

}

const IANoobMove = (squares: string[]) : number => {
    let emptyIndexes:number[] = [];
    for(let i = 0; i < squares.length; i++) {
        if(squares[i] === null) {
            emptyIndexes.push(i);
        }
    }
    const randomPlay = Math.floor(Math.random() * (emptyIndexes.length - 0));

    return emptyIndexes[randomPlay];
}

const IAEasyMove = (squares: string[]): number=> {
    let play: Play = {
        index: 0,
        type: ""
    }
    play = lookingForWinning(squares);

    if (play.type !== TYPE.WIN){ 
        play.index = IANoobMove(squares);
    }

    return play.index;
}

const IAMediumMove = (squares: string[]): number=> {
    let play: Play = {
        index: 0,
        type: ""
    }
    play = lookingForWinning(squares);

    if (play.type !== TYPE.WIN){ 
        play = lookingForBlocking(squares);
    }
    if (play.type !== TYPE.WIN && play.type !== TYPE.BLOCK){
        play.index = IANoobMove(squares);
    }
    
    return play.index;
}

const lookingForWinning = (squares: string[]): Play=> {
    let play: Play = {
        index: 0,
        type: ""
    }

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
		if ((squares[a] === "〇" && squares[b] === "〇") || (squares[a] === "〇" && squares[c] === "〇") || (squares[b] === "〇" && squares[c] === "〇")) {
            if(squares[a] === null) {
                console.log("busca ganar " + a);
                play.index =  a
                play.type = TYPE.WIN
                break;
            } else if(squares[b] === null) {
                play.index =  b
                play.type = TYPE.WIN
                console.log("busca ganar " + b);
                break;
            }
            else if(squares[c] === null){
                console.log("busca ganar " + c);
                play.index =  c
                play.type = TYPE.WIN
                break;
            }
		}
	}

    return play;
}

const lookingForBlocking = (squares: string[]): Play=> {
    let play: Play = {
        index: 0,
        type: ""
    }

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
		if ((squares[a] === "✕" && squares[b] === "✕") || (squares[a] === "✕" && squares[c] === "✕") || (squares[b] === "✕" && squares[c] === "✕")) {
            if(squares[a] === null) {
                console.log("busca tapar " + a);
                play.index =  a
                play.type = TYPE.BLOCK
                break;
            } else if(squares[b] === null) {
                play.index =  b
                play.type = TYPE.BLOCK
                console.log("busca tapar " + b);
                break;
            }
            else if(squares[c] === null){
                console.log("busca tapar " + c);
                play.index =  c
                play.type = TYPE.BLOCK
                break;
            }
		}
	}

    return play;
}