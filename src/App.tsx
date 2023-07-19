// App.tsx
import React, { useEffect, useState } from "react";
import "./App.css";
import { Board } from "./models/Board";
import { BoardComponent } from "./components/BoardComponent";
import { Player } from "./models/Player";
import { Colors } from "./models/Color";
import { LostFigures } from "./components/LostFigures";
import { Timer } from "./components/Timer";
import { Popup } from "./components/Popup";

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [winPlayer, setWinPlayer] = useState<Player | null>(null);
  const [gameTime, setGameTime] = useState<number>(10);
  const [start, setStart] = useState<number>(0);
  const [isCheckmate, setIsCheckmate] = useState(false);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setIsCheckmate(false);
  }

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  }

  useEffect(() => {
    const checkmateInterval = setInterval(() => {
      if (currentPlayer) {
        board.isCheckmate(currentPlayer.color);
        setIsCheckmate(board.checkmate);
        if (isCheckmate) {
          setWinPlayer(
            currentPlayer.color === Colors.WHITE
              ? new Player(Colors.BLACK)
              : new Player(Colors.WHITE)
          );
          setCurrentPlayer(null);
          restart();
        }
      }
    }, 100);

    return () => {
      clearInterval(checkmateInterval);
    };
  }, [currentPlayer, board, isCheckmate]);

  return (
    <div className="App">
      <Timer
        restart={restart}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        setWinPlayer={setWinPlayer}
        winPlayer={winPlayer}
        gameTime={gameTime}
        start={start}
      />
      {winPlayer || start === 0 ? (
        <Popup
          winPlayer={winPlayer}
          restart={restart}
          setWinPlayer={setWinPlayer}
          setStart={setStart}
          gameTime={gameTime}
          setGameTime={setGameTime}
        />
      ) : null}
      <div className="game">
        <LostFigures figures={board.lostWhiteFigures} />

        <BoardComponent
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
        />
        <LostFigures figures={board.lostBlackFigures} />
      </div>
    </div>
  );
}

export default App;
