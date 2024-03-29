import { useEffect, useState, useRef } from "react"
import Cell from "./Components/Cell"
import checkForWinner from "./helpers/checkForWinner"

function App() {
  const emptyBoard = Array(9).fill()
  const [board, setBoard] = useState(emptyBoard)
  const [turn, setTurn] = useState("X")
  const [winnerMessage, setWinnerMessage] = useState("")
  const [isGameOver, setIsGameOver] = useState(false)
  const newGame = useRef(true)

  function handleClick(id) {
    const targetCell = board[id]

    // If target cell contains X / O or if game over, return.
    if (targetCell || isGameOver) return

    setBoard((prevBoard) => {
      const newBoard = [...prevBoard]
      newBoard[id] = turn
      return newBoard
    })
  }

  function restartGame() {
    setBoard(emptyBoard)
    setWinnerMessage("")
    setIsGameOver(false)
    newGame.current = true
  }

  useEffect(() => {
    // If "StrictMode" enabled in development mode, "useEffect" runs
    // twice during the first render and causes unnecessary player
    // turn changes. In prod. mode, this is working as intended.
    if (newGame.current) newGame.current = false
    else {
      checkForWinner(board, turn, setWinnerMessage, setIsGameOver)
      setTurn((prevTurn) => (prevTurn === "X" ? "O" : "X"))
    }
  }, [board])

  const boardElements = board.map((sign, i) => {
    return (
      <Cell
        key={i}
        id={i}
        sign={sign}
        setBoard={setBoard}
        handleClick={handleClick}
        isGameOver={isGameOver}
      />
    )
  })

  return (
    <main className="app">
      <div className="board">{boardElements}</div>
      <div className="info-container">
        <span className="game-status">{winnerMessage || `${turn}'s turn.`}</span>
        {isGameOver ? (
          <button onClick={restartGame} className="restart-btn">
            Play Again
          </button>
        ) : (
          <div className="fun-fact">
            <p>Fun fact:</p>
            <p>
              All Tic-Tac-Toe games end in
              <br />a draw when played correctly.
            </p>
            <p>Actually, this fact isn't fun.</p>
            <p className="old-school-smiley">:)</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default App
