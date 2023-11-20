import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import { TURNS } from "./constants";
import { checkWinnerFrom, checkEndGame} from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { saveGameToStorage, resetGameStorage } from "./logic/storage";
function App() {
    //Ningun hook como el setState pueden ir dentro de un if o dentro de nada.
    const [board, setBoard] = useState(() => {
        const boardFromStorage = window.localStorage.getItem('board')
        if (boardFromStorage) return JSON.parse(boardFromStorage)
        return Array(9).fill(null)
    })
        
    const [turn, setTurn] = useState(()=>{
        const turnFromStorage = localStorage.getItem("turn");
        //El ?? comprueba si el valor es null o undefined.
        return turnFromStorage ?? TURNS.X
    });
    const [winner, setWinner] = useState(null) // Null no hay ganador y false es que hay un empate.

    //Para resetear cualquier tipo de cosa, formulario, juego, nos aseguramos de que seteamos el estado
    //sus valores iniciales
    const resetGame = ()=>{
        setBoard(Array(9).fill(null));
        setTurn(TURNS.X);
        setWinner(null);
        //Reseteamos el estado del localStorage
        resetGameStorage();
    }

    const updateBoard = (index)=>{
        //No modificar la posicion si ya contiene algo
        if (board[index] || winner) return
        //JAMAS MODIFICAR ARRAY QUE YA VIENE, SINO GUARDAR EL NUEVO EN UNA NUEVA VARIABLE
        //Creamos nuestra nueva tabla
        const newBoard = [... board];
        //En la posicion guardamos el turno
        newBoard[index] = turn;
        //Seteamos el nuevo board
        setBoard(newBoard);
        //Declaramos el nuevo movimiento y manejamos el turno
        const newTurn = turn ===TURNS.X ? TURNS.O : TURNS.X;
        //Seteamos el nuevo movimiento
        setTurn(newTurn);
        //Guardado de partida aqui
        saveGameToStorage({
            board: newBoard,
            turn: newTurn
        });
        //Revisamos si tenemos un winner
        const newWinner = checkWinnerFrom(newBoard);
        if (newWinner) {
            confetti();
            setWinner(newWinner);
        } else if(checkEndGame(newBoard)){
            setWinner(false);
        }
    }
    //Por ejemplo serviria para coger el winner y ejecutarlo cuando haya un ganador, una peticion a base de datos, etc. 
    // useEffect(()=>{
           //Como minimo se ejecuta una vez
    //     console.log('UseEffect');
    // }, [winner])
    return (
        /* 
            Le pasamos como parametro updateBoard y no la funcion porque sino la cuando se renderice, 
            se ejecutara la funcion directamente en los 9 espacios.
        */
        <main className="board">
            <h1>Tic tac toe</h1>
            <button onClick={resetGame}>Reset del juego</button>
            <section className="game">
                {
                    board.map((square, index) => {
                        return(
                            
                            <Square 
                                key={index} 
                                index={index}
                                updateBoard={updateBoard}
                            >
                                {square}
                            </Square>
                        )
                    })
                }
            </section>
            <section className="turn">
                <Square isSelected={turn === TURNS.X}>
                    {TURNS.X}
                </Square>
                <Square isSelected={turn === TURNS.O}>
                    {TURNS.O}
                </Square>
            </section>
            <WinnerModal resetGame={resetGame} winner={winner}/>
        </main>
    )
}

export default App
