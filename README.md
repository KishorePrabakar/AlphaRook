# AlphaRook

A real-time multiplayer chess game built with Go and React.

## Features

- Real-time multiplayer gameplay over WebSockets
- Full chess rule enforcement via `chess.js` (checkmate, stalemate, draws, threefold repetition)
- Lobby system — create or join a game room with a shareable code
- In-game chat between players
- Drag-and-drop piece movement with move and capture sounds
- End-game overlay with win/loss/draw result and rematch option
- Responsive layout with chat panel for desktop and mobile

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Go 1.21 + Gorilla WebSocket |
| Frontend | React 18 + Vite + Tailwind CSS |
| Chess Logic | chess.js + chessboardjsx |
| UI Components | Material UI (MUI) v5 |
| Deployment | Vercel (frontend) |

## Project Structure

```
alpharook/
├── backend/
│   ├── main.go              # HTTP server entry point and route registration
│   └── server/
│       ├── room.go          # Room creation, client registration, broadcasting
│       ├── client.go        # WebSocket client read/write pumps
│       └── message.go       # Message types and encoding
├── frontend/
│   ├── src/
│   │   ├── chess/
│   │   │   └── ChessApp.jsx      # Chess game logic (moves, game state, sound)
│   │   ├── components/
│   │   │   ├── Lobby.jsx         # Create/join room UI
│   │   │   ├── Waiting.jsx       # Waiting for opponent screen
│   │   │   ├── BoardOneVsOne.jsx # Chess board rendering
│   │   │   ├── Chat.jsx          # Slide-over chat panel (mobile)
│   │   │   ├── ChatOpened.jsx    # Inline chat panel (desktop)
│   │   │   └── EndGameMessage.jsx# Win / lose / draw overlay
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Landing page
│   │   │   └── Game.jsx          # Main game page with WebSocket orchestration
│   │   ├── scripts/              # Move and capture audio helpers
│   │   ├── App.jsx               # Router root
│   │   └── main.jsx              # React entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── vercel.json
└── README.md
```

## Setup

### Backend

```bash
cd backend
go mod download
go run main.go
```

Server runs on `http://localhost:8080`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

> **Note:** Create a `frontend/.env.local` file and set `VITE_BASE_URL_SERVER=ws://localhost:8080` for local development. For production on Vercel, add `VITE_BASE_URL_SERVER=wss://your-backend-url.com` as an environment variable in the project settings.

## API / WebSocket Endpoints

| Method | Path | Description |
|---|---|---|
| `WS` | `/create-room?id={roomId}` | Creates a new room and connects as Player 1 |
| `WS` | `/join-room?id={roomId}` | Joins an existing room as Player 2 |

### WebSocket Message Actions

| Action | Direction | Description |
|---|---|---|
| `CONNECTED_ON_SERVER` | Server → Client | Confirms room creation, returns room ID |
| `ENTERED_ON_SERVER` | Server → Client | Confirms successful room join |
| `START_GAME` | Server → Client | Triggers game start when both players are connected |
| `GAME_MOVE` | Bidirectional | FEN string of the board after a move |
| `GAME_CHECKMATE` | Client → Server | Announces checkmate result |
| `GAME_DRAW` | Client → Server | Announces draw (50-move rule, stalemate, repetition) |
| `GAME_REMATCH` | Client → Server | Resets the board for a rematch |
| `CHAT_MESSAGE` | Bidirectional | In-game chat message |
| `USER_LEFT_ROOM` | Server → Client | Notifies when opponent disconnects |

## How to Play

1. Open the app and click **Create Game** — you are assigned **Player 1 (White)**
2. Share the generated room code with your opponent
3. Opponent enters the code on the home screen and joins as **Player 2 (Black)**
4. Drag and drop pieces to make moves — the board enforces all standard chess rules
5. Use the chat icon to send messages during the game
6. After checkmate or a draw, choose to rematch or leave

## To-Do

### Gameplay
- [ ] Chess clock (Bullet / Blitz / Rapid time controls)
- [ ] Move history panel in algebraic notation
- [ ] Spectator mode
- [ ] Auto color swap on rematch

### Chess Logic
- [ ] AI opponent via Stockfish.js (WebAssembly)
- [ ] Opening name explorer
- [ ] Post-game position analysis

### UX & Polish
- [ ] Custom usernames before joining a room
- [ ] Legal move indicators (dots on valid squares)
- [ ] Highlight last move squares
- [ ] Captured pieces display with material advantage
- [ ] Board and piece themes
- [ ] Sound themes
- [ ] QR code to share and join a game room

### Competitive
- [ ] Matchmaking queue (auto-pair players)
- [ ] ELO rating system and leaderboard
- [ ] Game persistence with a database
- [ ] Player profiles with auth (JWT)

## License

MIT