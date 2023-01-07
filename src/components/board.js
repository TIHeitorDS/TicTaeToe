import React, { Fragment, useEffect, useState } from "react";

const Board = () => {
  const emptySquares = Array(9).fill("");
  const [board, setBoard] = useState(emptySquares);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (winner) return null;
    if (board[index] !== "") return null;

    setCurrentPlayer(currentPlayer === "O" ? "X" : "O");
    setBoard(board.map((item, key) => (key === index ? currentPlayer : item)));
  };

  const checkWinner = () => {
    const check = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    check.forEach((element) => {
      if (element.every((squere) => squere === "X")) setWinner("X");
      if (element.every((square) => square === "O")) setWinner("O");
    });

    draw();
  };

  const draw = () => {
    if (board.every((e) => e !== "")) setWinner("D");
  };

  const resetGame = () => {
    setBoard(emptySquares);
    setWinner(null);
  };

  useEffect(() => {
    checkWinner();
  });

  return (
    <main>
      {winner && (
        <div className="warning">
          {winner === "D" ? (
            <Fragment>
              <p>Empate!</p>
              <button onClick={resetGame} className="button">
                Nova partida
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <p>O jogador "{winner}" venceu</p>
              <button onClick={resetGame} className="button">
                Nova partida
              </button>
            </Fragment>
          )}
        </div>
      )}
      <div className={`board ${winner ? "game-over" : ""}`}>
        {board.map((item, index) => (
          <div
            className={`cell ${item}`}
            key={index}
            onClick={() => handleClick(index)}
          >
            {item}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Board;
