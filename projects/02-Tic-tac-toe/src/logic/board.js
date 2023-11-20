import { WINNER_COMBOS } from "../constants";

//Se puede usar para cualquier tipo de framework porque es codigo JAVASCRIPT
export const checkWinnerFrom = (boardToCheck)=>{
    //Para cada combinacion que tenemos en WINNER_COMBOS...
    //Revisamos todas las combinaciones ganadoras.
    for(const combo of WINNER_COMBOS){  
        const [a,b,c] = combo
        if (
            boardToCheck[a] && // 0 -> x u o
            boardToCheck[a]===boardToCheck[b] &&
            boardToCheck[a]===boardToCheck[c]
        ) {
            return boardToCheck[a]
        }
    }
    //Si no hay ganador
    return null;
}

export const checkEndGame = (newBoard) =>{
    //SI TODAS las squares no son null, es decir, que se han pulsado y llevan algo, ha terminado el juego
    return newBoard.every((square) => square !== null);
}