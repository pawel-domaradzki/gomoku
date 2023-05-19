import { useContext, useEffect, useState } from "react";
import Logo from "../../src/assets/logo.svg";
import Board from "../components/Board";
import RoundOver from "../components/RoundOver";
import Restart from "../components/buttons/Restart";
import IconO from "../components/icons/IconO";
import IconX from "../components/icons/IconX";
import styles from "../styles/Game.module.scss";

import { GameModeContext, PlayerContext } from "../Contexts";

import { BoardArr } from "../types";

import Results from "../components/Results";

const createBoard = (rows: number, columns: number) => {
  const board: BoardArr = [];
  for (let i = 0; i < rows; i++) {
    board.push(Array(columns).fill(null));
  }
  return board;
};

const Game = () => {
  const [board, setBoard] = useState<string[][]>(createBoard(15, 15));
  const [cpuTurn, setCpuTurn] = useState(false);

  const { gameMode } = useContext(GameModeContext);

  const { playerMark, setPlayerMark } = useContext(PlayerContext);

  const [winningPositions, setWinningPositions] = useState<number[][]>([]);
  const [winner, setWinner] = useState("");
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (winningPositions.length) return;

    if (isInitialRender) {
      setIsInitialRender(false);
    } else {
      handleCPUTurn();
    }
  }, [cpuTurn, isInitialRender, winningPositions]);

  function getAvailableCells(board: BoardArr) {
    const availableCells = [];

    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === null) {
          availableCells.push({ row, col });
        }
      }
    }

    return availableCells;
  }

  function determineCPUMove(board: BoardArr) {
    const availableCells = getAvailableCells(board);

    const randomIndex = Math.floor(Math.random() * availableCells.length);

    return availableCells[randomIndex];
  }

  const handleTileClick = (row: number, column: number) => {
    if (winningPositions.length || !board || cpuTurn) {
      return;
    }

    const newBoard = board.slice();

    if (playerMark && !newBoard[row][column]) {
      newBoard[row][column] = playerMark;

      setBoard(newBoard);
      setPlayerMark(playerMark === "x" ? "o" : "x");
      calculateWinner(board, playerMark);
    }

    if (gameMode === "pvp") {
      return;
    }

    setCpuTurn(true);
  };

  const handleCPUTurn = () => {
    if (cpuTurn && !isInitialRender && board) {
      const cpuMark = playerMark === "x" ? "x" : "o";

      setTimeout(() => {
        const nextMove = [...board];
        const { row, col } = determineCPUMove(nextMove);

        nextMove[row][col] = cpuMark;

        setBoard(nextMove);
        setCpuTurn(false);
        setPlayerMark(playerMark === "x" ? "o" : "x");
        calculateWinner(board, cpuMark);
      }, 700);
    }
  };

  const startNextRound = () => {
    setWinner("");
    setWinningPositions([]);

    setBoard(createBoard(15, 15));
  };

  function checkDirection({
    row,
    col,
    rowDir,
    colDir,
    player,
    board,
  }: CheckDirectionParams) {
    const winningPositions: number[][] = [];
    for (let i = 0; i < 5; i++) {
      if (board[row + i * rowDir][col + i * colDir] !== player) {
        return;
      }
      winningPositions.push([row + i * rowDir, col + i * colDir]);
    }

    setWinningPositions(winningPositions);
    setWinner(player);

    return;
  }

  const calculateWinner = (board: BoardArr, player: string) => {
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 11; j++) {
        checkDirection({
          row: i,
          col: j,
          rowDir: 0,
          colDir: 1,
          player,
          board,
        });
      }
    }

    for (let i = 0; i < 11; i++) {
      for (let j = 0; j < 15; j++) {
        checkDirection({ row: i, col: j, rowDir: 1, colDir: 0, player, board });
      }
    }

    for (let i = 0; i < 11; i++) {
      for (let j = 0; j < 11; j++) {
        checkDirection({ row: i, col: j, rowDir: 1, colDir: 1, player, board });
      }
    }

    for (let i = 0; i < 11; i++) {
      for (let j = 4; j < 15; j++) {
        checkDirection({
          row: i,
          col: j,
          rowDir: 1,
          colDir: -1,
          player,
          board,
        });
      }
    }
  };

  return (
    <>
      <RoundOver startNextRound={startNextRound} winner={winner} />

      <div className={styles.container}>
        <div className={styles.gameHeader}>
          <img src={Logo} alt="logo" width="72" height="32" />
          <div className={styles.turn}>
            {(playerMark === "x" && <IconX />) || <IconO />} <span>Turn</span>
          </div>
          <Restart />
        </div>
        <div className={styles.tilesGrid}>
          <Board
            board={board}
            handleTileClick={handleTileClick}
            winningPositions={winningPositions}
          />
        </div>
        <Results playerType={playerMark} />
      </div>
    </>
  );
};

export default Game;

interface CheckDirectionParams {
  row: number;
  col: number;
  rowDir: number;
  colDir: number;
  player: string;
  board: BoardArr;
}
