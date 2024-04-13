import { MODE } from "../gamestatus.model";

export const IAMove = (currentGameMode:string, squares: string[]) : number => {

    switch(currentGameMode){
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
    let move = IANoobMove(squares);

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
                move =  a
                break;
            } else if(squares[b] === null) {
                console.log("busca tapar " + b);
                move =  b
                break;
            }
            else if(squares[c] === null){
                console.log("busca tapar " + c);
                move = c
                break;
            }
		}
	}
    return move;
}

const IAMediumMove = (squares: string[]): number=> {
    let move = IAEasyMove(squares);

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
            console.log(`${squares[a]} ${squares[b]} ${squares[c]}`)
            if(squares[a] === null) {
                console.log("busca ganar " + a);
                move =  a
                break;
            } else if(squares[b] === null) {
                move =  b
                console.log("busca ganar " + b);
                break;
            }
            else if(squares[c] === null){
                console.log("busca ganar " + c);
                move = c
                break;
            }
		}
	}
    return move;
}