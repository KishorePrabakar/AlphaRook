package main

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Room struct {
	Game      *Game
	Players   map[*websocket.Conn]string
	Mutex     sync.Mutex
	WhiteConn *websocket.Conn
	BlackConn *websocket.Conn
}

type Move struct {
	FromRow int `json:"fromRow"`
	FromCol int `json:"fromCol"`
	ToRow   int `json:"toRow"`
	ToCol   int `json:"toCol"`
}

type Message struct {
	Type string      `json:"type"`
	Data interface{} `json:"data"`
}

var rooms = make(map[string]*Room)
var roomsMutex sync.Mutex

func main() {
	http.HandleFunc("/ws", handleWS)
	http.HandleFunc("/create", createRoom)
	http.HandleFunc("/join", joinRoom)

	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func createRoom(w http.ResponseWriter, r *http.Request) {
	roomID := generateRoomID()

	roomsMutex.Lock()
	rooms[roomID] = &Room{
		Game:    NewGame(),
		Players: make(map[*websocket.Conn]string),
	}
	roomsMutex.Unlock()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"roomID": roomID})
}

func joinRoom(w http.ResponseWriter, r *http.Request) {
	roomID := r.URL.Query().Get("room")

	roomsMutex.Lock()
	_, exists := rooms[roomID]
	roomsMutex.Unlock()

	if !exists {
		http.Error(w, "Room not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

func handleWS(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("WebSocket error:", err)
		return
	}

	roomID := r.URL.Query().Get("room")
	color := r.URL.Query().Get("color")

	roomsMutex.Lock()
	room, exists := rooms[roomID]
	roomsMutex.Unlock()

	if !exists {
		conn.Close()
		return
	}

	room.Mutex.Lock()
	defer room.Mutex.Unlock()

	if color == "white" && room.WhiteConn == nil {
		room.WhiteConn = conn
		room.Players[conn] = "white"
	} else if color == "black" && room.BlackConn == nil {
		room.BlackConn = conn
		room.Players[conn] = "black"
	} else {
		conn.Close()
		return
	}

	sendBoardState(conn, room.Game)

	defer func() {
		room.Mutex.Lock()
		delete(room.Players, conn)
		if room.WhiteConn == conn {
			room.WhiteConn = nil
		}
		if room.BlackConn == conn {
			room.BlackConn = nil
		}
		room.Mutex.Unlock()
		conn.Close()
	}()

	for {
		var msg Message
		err := conn.ReadJSON(&msg)
		if err != nil {
			break
		}

		if msg.Type == "move" {
			var move Move
			data, _ := json.Marshal(msg.Data)
			json.Unmarshal(data, &move)

			if room.Game.MakeMove(move.FromRow, move.FromCol, move.ToRow, move.ToCol) {
				broadcastBoardState(room)
			}
		}
	}
}

func sendBoardState(conn *websocket.Conn, game *Game) {
	msg := Message{
		Type: "board",
		Data: game,
	}
	conn.WriteJSON(msg)
}

func broadcastBoardState(room *Room) {
	msg := Message{
		Type: "board",
		Data: room.Game,
	}

	for conn := range room.Players {
		conn.WriteJSON(msg)
	}
}

func generateRoomID() string {
	const letters = "abcdefghijklmnopqrstuvwxyz"
	b := make([]byte, 6)
	for i := range b {
		b[i] = letters[i%26]
	}
	return string(b)
}
