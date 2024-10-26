import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Game.css'


function Square({value, onSquareClick}) {
  return (
  <button className="square btn btn-warning" onClick={onSquareClick}>{value}</button>
  ) 
}


function Board ({ xIsNext, squares, onPlay }){

    function handleClick(i) {
      if (calcularWinner (squares) || squares[i]) {
        return
      }
      const nextSquares = squares.slice();
      if (xIsNext){
        nextSquares[i] = 'X'
      }
      else {
        nextSquares[i] = 'O'
      }
      onPlay(nextSquares)

    }

    const winner = calcularWinner(squares)
    let status
    if (winner) {
      status = 'O vencedor é: ' + winner
    }
    else {
      status = 'Proximo: ' + (xIsNext ? 'X' : 'O')
    }

    return (
    <>
       <div className="status mb-3">{status}</div>
       <div className="board-row d-flex justify-content-center">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row d-flex justify-content-center">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row d-flex justify-content-center">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
    );  
}

function Game () {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay (nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  const moves = history.map((squares, move) => {
    let description
    if (move > 0) {
      description = 'Jogada ' + move
    }
    else {
      description = (
      <>
      <i class="bi bi-house-door"></i> Inicio
      </>
      )
    }

    return (
      <li key={move}>
        <button 
        class="btn btn-warning custom-button"
        onClick={() => jumpTo(move)}> {description}
        </button>
      </li>
    )
  })
  
  return (

    <div className='container'>
      <div className='row'>
          {/* Tabuleiro */}
        <div className='col-md-9 text-center'>
          <div className='game-board'>
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          </div>
        </div>
          {/* Movimentação */}

        <div className='col-md-3'>
          <div className='game-info'>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    </div>
    
  )
}

function calcularWinner (squares) {

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
    if (squares[a] && squares[a] === squares[b] && squares [a] === squares[c]) {
      return squares[a]
   }
 }
  return null
}


export default Game

