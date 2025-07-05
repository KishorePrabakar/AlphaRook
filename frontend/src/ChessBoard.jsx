import { useState, useEffect, useRef } from 'react'
import './ChessBoard.css'

const PIECE_SYMBOLS = {
  white: { king: '♔', queen: '♕', rook: '♖', bishop: '♗', knight: '♘', pawn: '♙' },
  black: { king: '♚', queen: '♛', rook: '♜', bishop: '♝', knight: '♞', pawn: '♟' }
}

function ChessBoard({ roomID, color }) {
  const [board, setBoard] = useState(null)
  const [turn, setTurn] = useState('')
  const [selected, setSelected] = useState(null)
  const wsRef = useRef(null)

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/ws?room=${roomID}&color=${color}`)
    wsRef.current = ws

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data)
      if (msg.type === 'board') {
        setBoard(msg.data.Board)
        setTurn(msg.data.Turn)
      }
    }

    return () => ws.close()
  }, [roomID, color])

  const handleSquareClick = (row, col) => {
    if (!board) return

    const piece = board[row][col]
    
    if (selected) {
      const move = {
        type: 'move',
        data: {
          fromRow: selected.row,
          fromCol: selected.col,
          toRow: row,
          toCol: col
        }
      }
      wsRef.current.send(JSON.stringify(move))
      setSelected(null)
    } else if (piece && piece.color === turn) {
      setSelected({ row, col })
    }
  }

  const getPieceSymbol = (piece) => {
    if (!piece) return ''
    return PIECE_SYMBOLS[piece.color][piece.type]
  }

  const isLightSquare = (row, col) => (row + col) % 2 === 0

  if (!board) {
    return <div className="loading">Connecting...</div>
  }

  return (
    <div className="chessboard-container">
      <div className="info">
        <p>Room: {roomID}</p>
        <p>You are: {color}</p>
        <p>Turn: {turn}</p>
      </div>
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`square ${isLightSquare(rowIndex, colIndex) ? 'light' : 'dark'} ${
                selected?.row === rowIndex && selected?.col === colIndex ? 'selected' : ''
              }`}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
            >
              <span className="piece">{getPieceSymbol(piece)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ChessBoard
