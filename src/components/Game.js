import React from 'react';
import Board from './Board';

function Game() {
  const [history, setHistory] = React.useState([
    { squares: Array(9).fill(null) }
  ]);
  const [step, setStep] = React.useState(0)
  const [xIsNext, setXIsNext] = React.useState(true);
  const current = history[step];
  const winner = calculateWinner(current.squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to the game start';

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    )
  })

  function handleClick(index) {
    const clonedHistory = history.slice(0, step + 1)
    console.log("🚀 ~ file: index.html ~ line 83 ~ handleClick ~ clonedHistory", clonedHistory)
    const current = clonedHistory[clonedHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[index]) { return }
    squares[index] = xIsNext ? 'X' : 'O';
    setHistory(clonedHistory.concat({squares}))
    setStep(clonedHistory.length)
    setXIsNext(!xIsNext)
  }

  function jumpTo(step){
    setStep(step)
    setXIsNext((step % 2) === 0)
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(index) => handleClick(index)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

export default Game;