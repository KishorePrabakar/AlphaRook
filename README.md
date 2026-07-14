# AlphaRook

Realtime multiplayer chess game built with GoLang and React.

## Features

- Real-time multiplayer gameplay using WebSockets
- Full chess game logic with piece movement validation
- Room-based game management
- Simple React UI
- Pawn promotion to queen

## Tech Stack

- **Backend**: Go 1.26 with Gorilla WebSocket
- **Frontend**: React 18 with Vite
- **Deployment**: Vercel (frontend)

## Project Structure

```
alpharook/
├── backend-v1/
│   ├── main.go      # WebSocket server and room management
│   ├── chess.go     # Chess game logic
│   ├── go.mod
│   └── go.sum
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main app component
│   │   ├── ChessBoard.jsx    # Chess board UI
│   │   ├── App.css
│   │   └── ChessBoard.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
└── README.md
```

## Setup

### Backend

1. Go to backend directory:
```bash
cd backend-v1
```

2. Install dependencies:
```bash
go mod download
```

3. Run the server:
```bash
go run main.go chess.go
```

Backend runs on port 8080.

### Frontend

1. Go to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run dev server:
```bash
npm run dev
```

Frontend runs on port 3000.

## How to Play

1. Open the app in browser
2. Click "Create Game" to start new room (you play as white)
3. Share room ID with friend
4. Friend enters room ID and picks "black" to join
5. Take turns moving pieces by clicking them and destination squares
6. Game enforces standard chess rules

## API Endpoints

- `POST /create` - Creates new game room
- `GET /join?room={id}` - Checks if room exists
- `WS /ws?room={id}&color={white|black}` - WebSocket connection for gameplay

## License

MIT