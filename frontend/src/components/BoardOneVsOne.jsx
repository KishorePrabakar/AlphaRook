import React, { useEffect, useState } from "react";
import Chessboard from "chessboardjsx";
import chess from "chess.js";

import ChessApp from "../chess/ChessApp.jsx";

const boardStyle = {
    borderRadius: "5px",
    boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
};

const lightSquareColor = "AliceBlue";
const darkSquareColor = "#b3b3b3";

export default function BoardOneVsOne(props) {
    const [position, setPosition] = useState(props.position || "start");
    const [moveOptions, setMoveOptions] = useState([]);
    const [userName, setUserName] = useState(props.userName || "Player 1");

    useEffect(() => {
        const updateMoveOptions = () => {
            const game = new chess();
            game.load(position);
            const moves = game.moves({ verbose: true });
            const result = [];
            moves.forEach(function (move) {
                result.push({ from: move.from, to: move.to, promotion: move.promotion });
            });
            setMoveOptions(result);
        };
        updateMoveOptions();
    }, [position]);

    const boardPerspective = () => {
        if (userName) {
          return userName == "Player 2" ? "black" : "white"
        }
        return "white"
      }
    
    const squareColor = (square) => {
        const isLight = (square.slice(0, 1) >= 'a' && square.slice(0, 1) <= 'h') ?
            (square.charCodeAt(1) - '1'.charCodeAt(0)) % 2 === 0 :
            (square.charCodeAt(1) - '1'.charCodeAt(0)) % 2 !== 0;
        return isLight ? lightSquareColor : darkSquareColor;
    };

    return (
      <div className="flex justify-around items-center">
        <ChessApp userName={userName} webSocket={props.webSocket}>
          {({ position: appPosition, onDrop }) => (
            <Chessboard
              id="ChessApp"
              position={position}
              onDrop={onDrop}
              boardStyle={boardStyle}
              lightSquareStyle={{ backgroundColor: squareColor }}
              darkSquareStyle={{ backgroundColor: darkSquareColor }}
              
              orientation={boardPerspective()}
              showLegalMoves={moveOptions.length > 0 ? moveOptions : false}
              draggable
              position={position}
            />
          )}
        </ChessApp>
      </div>
    );
}