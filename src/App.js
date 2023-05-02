import React, { useState } from "react";
import "./App.css";
import Board from "./component/Board";
import ScoreBoard from "./component/ScoreBoard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetButton from "./component/ResetButton";

const App = () => {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const toastTie = {
    duration: 4000,
    position: "top-center",
    // Styling
    style: {},
    className: "",
    draggable: true,
    // Custom Icon
    icon: "👏",
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: "#000",
      secondary: "#fff",
    },
    // Aria
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  };
  const toastWin = {
    duration: 4000,
    position: "top-center",
    // Styling
    style: {},
    className: "",
    draggable: true,
    // Custom Icon
    icon: "🎉",
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: "#000",
      secondary: "#fff",
    },
    // Aria
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  };
  const showToastMessage = () => {
    toast.info("Match Tied ! Please Reset The Game",toastTie);
  };
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [score, setScore] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);
  // Step 1: Update the board
  const handleBoxClick = (boxIdx) => {
    const updateBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying === true ? "X" : "O";
      } else {
        return value;
      }
    });
    // Step 2: Check if either player has won the game
    const checkWinner = (board) => {
      for (let i = 0; i < winConditions.length; i++) {
        const [x, y, z] = winConditions[i];
        // Iterate through win conditions and check if either player satisfies them
        if (board[x] && board[x] === board[y] && board[y] === board[z]) {
          setGameOver(true);
          return board[x];
        }
      }
      let flag = false;
      for (let i = 0; i < winConditions.length; i++) {
        const [x,y,z] = winConditions[i];
        if (board[x] && board[y] && board[z] && !gameOver) {
          flag = true;
        }else{
          flag = false;
          break;
        }
      }
      if(flag) {showToastMessage()};
    };
    setBoard(updateBoard);
    //
    const winner = checkWinner(updateBoard);

    setXPlaying(!xPlaying);
    if (winner) {
      if (winner === "O") {
        //toast.success(`Hurrah ! Player ${<OSymbol>O</OSymbol>} won the game`, toastWin);
        let { oScore } = score;
        oScore += 1;
        setScore({ ...score, oScore });
      } else {
        //toast.success('Hurrah ! Player X won the game', toastWin);
        let { xScore } = score;
        xScore += 1;
        setScore({ ...score, xScore });
      }
      toast.success(
        `Hurrah! Player ${winner === 'O' ? 'O' : 'X'} won the game`,
        toastWin
      );
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="App">
      <ScoreBoard score={score} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
      <ToastContainer/>
    </div>
  );
};

export default App;
