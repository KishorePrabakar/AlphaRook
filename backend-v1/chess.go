package main

type Piece struct {
	Type  string
	Color string
}

type Board [8][8]*Piece

type Game struct {
	Board       Board
	Turn        string
	WhiteKing   [2]int
	BlackKing   [2]int
	WhiteCastle bool
	BlackCastle bool
}

func NewGame() *Game {
	g := &Game{
		Turn:        "white",
		WhiteCastle: true,
		BlackCastle: true,
	}

	g.Board[0][0] = &Piece{Type: "rook", Color: "black"}
	g.Board[0][1] = &Piece{Type: "knight", Color: "black"}
	g.Board[0][2] = &Piece{Type: "bishop", Color: "black"}
	g.Board[0][3] = &Piece{Type: "queen", Color: "black"}
	g.Board[0][4] = &Piece{Type: "king", Color: "black"}
	g.Board[0][5] = &Piece{Type: "bishop", Color: "black"}
	g.Board[0][6] = &Piece{Type: "knight", Color: "black"}
	g.Board[0][7] = &Piece{Type: "rook", Color: "black"}

	for i := 0; i < 8; i++ {
		g.Board[1][i] = &Piece{Type: "pawn", Color: "black"}
		g.Board[6][i] = &Piece{Type: "pawn", Color: "white"}
	}

	g.Board[7][0] = &Piece{Type: "rook", Color: "white"}
	g.Board[7][1] = &Piece{Type: "knight", Color: "white"}
	g.Board[7][2] = &Piece{Type: "bishop", Color: "white"}
	g.Board[7][3] = &Piece{Type: "queen", Color: "white"}
	g.Board[7][4] = &Piece{Type: "king", Color: "white"}
	g.Board[7][5] = &Piece{Type: "bishop", Color: "white"}
	g.Board[7][6] = &Piece{Type: "knight", Color: "white"}
	g.Board[7][7] = &Piece{Type: "rook", Color: "white"}

	g.WhiteKing = [2]int{7, 4}
	g.BlackKing = [2]int{0, 4}

	return g
}

func (g *Game) IsValidMove(fromRow, fromCol, toRow, toCol int) bool {
	if fromRow < 0 || fromRow > 7 || fromCol < 0 || fromCol > 7 {
		return false
	}
	if toRow < 0 || toRow > 7 || toCol < 0 || toCol > 7 {
		return false
	}

	piece := g.Board[fromRow][fromCol]
	if piece == nil {
		return false
	}

	if piece.Color != g.Turn {
		return false
	}

	target := g.Board[toRow][toCol]
	if target != nil && target.Color == piece.Color {
		return false
	}

	switch piece.Type {
	case "pawn":
		return g.isValidPawnMove(fromRow, fromCol, toRow, toCol, piece.Color)
	case "rook":
		return g.isValidRookMove(fromRow, fromCol, toRow, toCol)
	case "knight":
		return g.isValidKnightMove(fromRow, fromCol, toRow, toCol)
	case "bishop":
		return g.isValidBishopMove(fromRow, fromCol, toRow, toCol)
	case "queen":
		return g.isValidQueenMove(fromRow, fromCol, toRow, toCol)
	case "king":
		return g.isValidKingMove(fromRow, fromCol, toRow, toCol)
	}

	return false
}

func (g *Game) isValidPawnMove(fromRow, fromCol, toRow, toCol int, color string) bool {
	direction := 1
	if color == "white" {
		direction = -1
	}

	startRow := 6
	if color == "black" {
		startRow = 1
	}

	if fromCol == toCol {
		if toRow == fromRow+direction {
			return g.Board[toRow][toCol] == nil
		}
		if fromRow == startRow && toRow == fromRow+2*direction {
			return g.Board[toRow][toCol] == nil && g.Board[fromRow+direction][toCol] == nil
		}
	}

	if abs(toCol-fromCol) == 1 && toRow == fromRow+direction {
		target := g.Board[toRow][toCol]
		if target != nil && target.Color != color {
			return true
		}
	}

	return false
}

func (g *Game) isValidRookMove(fromRow, fromCol, toRow, toCol int) bool {
	if fromRow != toRow && fromCol != toCol {
		return false
	}

	return g.isPathClear(fromRow, fromCol, toRow, toCol)
}

func (g *Game) isValidKnightMove(fromRow, fromCol, toRow, toCol int) bool {
	rowDiff := abs(toRow - fromRow)
	colDiff := abs(toCol - fromCol)

	return (rowDiff == 2 && colDiff == 1) || (rowDiff == 1 && colDiff == 2)
}

func (g *Game) isValidBishopMove(fromRow, fromCol, toRow, toCol int) bool {
	if abs(toRow-fromRow) != abs(toCol-fromCol) {
		return false
	}

	return g.isPathClear(fromRow, fromCol, toRow, toCol)
}

func (g *Game) isValidQueenMove(fromRow, fromCol, toRow, toCol int) bool {
	return g.isValidRookMove(fromRow, fromCol, toRow, toCol) || g.isValidBishopMove(fromRow, fromCol, toRow, toCol)
}

func (g *Game) isValidKingMove(fromRow, fromCol, toRow, toCol int) bool {
	rowDiff := abs(toRow - fromRow)
	colDiff := abs(toCol - fromCol)

	return rowDiff <= 1 && colDiff <= 1
}

func (g *Game) isPathClear(fromRow, fromCol, toRow, toCol int) bool {
	rowDir := 0
	if toRow > fromRow {
		rowDir = 1
	} else if toRow < fromRow {
		rowDir = -1
	}

	colDir := 0
	if toCol > fromCol {
		colDir = 1
	} else if toCol < fromCol {
		colDir = -1
	}

	currentRow, currentCol := fromRow+rowDir, fromCol+colDir

	for currentRow != toRow || currentCol != toCol {
		if g.Board[currentRow][currentCol] != nil {
			return false
		}
		currentRow += rowDir
		currentCol += colDir
	}

	return true
}

func (g *Game) MakeMove(fromRow, fromCol, toRow, toCol int) bool {
	if !g.IsValidMove(fromRow, fromCol, toRow, toCol) {
		return false
	}

	piece := g.Board[fromRow][fromCol]
	g.Board[toRow][toCol] = piece
	g.Board[fromRow][fromCol] = nil

	if piece.Type == "king" {
		if piece.Color == "white" {
			g.WhiteKing = [2]int{toRow, toCol}
		} else {
			g.BlackKing = [2]int{toRow, toCol}
		}
	}

	if piece.Type == "pawn" {
		if (piece.Color == "white" && toRow == 0) || (piece.Color == "black" && toRow == 7) {
			g.Board[toRow][toCol] = &Piece{Type: "queen", Color: piece.Color}
		}
	}

	if g.Turn == "white" {
		g.Turn = "black"
	} else {
		g.Turn = "white"
	}

	return true
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
