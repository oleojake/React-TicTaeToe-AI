export const API_KEY = null;

export async function getOpenIAMove(squares: string[]):Promise<number> {
    console.log(squares);
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + API_KEY
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: "You are a professional 3-in-a-row or tictaetoe player.You will receive the current layout of a board, starting to read the squares from left to right and from top to bottom. You play with the '〇' and you must answer me with the most optimal move. To do this give me a square index, from 1 to 9."
                },
                {
                    role: 'user',
                    content: "This is the current board: " + squares + ", remember your role, you play with 〇's , your answer must be just like this 'index: (your decision)'"
                }
            ]
        })
    })

    const data = await response.json()
    console.log(data);
    console.log(data.choices[0].message.content);
    const regex = /[0-9]$/
    const indexFromResponse = regex.exec(data.choices[0].message.content);
    if(indexFromResponse){
        console.log(Number(indexFromResponse[0])-1);
    }

    return Number(indexFromResponse)-1;
}
