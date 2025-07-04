import { useState } from 'react'
import ChessBoard from './ChessBoard'
import './App.css'

function App() {
  const [roomID, setRoomID] = useState('')
  const [color, setColor] = useState('')
  const [inGame, setInGame] = useState(false)

  const createGame = async () => {
    const res = await fetch('http://localhost:8080/create')
    const data = await res.json()
    setRoomID(data.roomID)
    setColor('white')
    setInGame(true)
  }

  const joinGame = () => {
    if (roomID && color) {
      setInGame(true)
    }
  }

  if (inGame) {
    return <ChessBoard roomID={roomID} color={color} />
  }

  return (
    <div className="app">
      <h1>AlphaRook</h1>
      <div className="menu">
        <button onClick={createGame}>Create Game</button>
        <div className="join">
          <input
            type="text"
            placeholder="Room ID"
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
          />
          <select value={color} onChange={(e) => setColor(e.target.value)}>
            <option value="">Select Color</option>
            <option value="white">White</option>
            <option value="black">Black</option>
          </select>
          <button onClick={joinGame}>Join Game</button>
        </div>
      </div>
    </div>
  )
}

export default App
