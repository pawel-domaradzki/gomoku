import { useContext, useEffect, useState } from "react";
import { GameModeContext, PlayerContext } from "../Contexts";

import Results from "../components/Results";
import Board from "../components/Board";
import RoundOver from "../components/RoundOver";
import Restart from "../components/buttons/Restart";
import IconO from "../components/icons/IconO";
import IconX from "../components/icons/IconX";

import Logo from "../../src/assets/logo.svg";
import styles from "../styles/Game.module.scss";

import { cpuBlockingMove, determineCPUMove } from "../utility/cpuLogic.ts";
import { createBoard, getAvailableTiles } from "../utility/board.ts";
import {
  CalculateParams,
  checkDirections,
} from "../utility/inARowDetection.ts";

import { BoardArr } from "../types";

const Game = () => {
  const [board, setBoard] = useState<string[][]>(createBoard(15, 15));

  const [cpuTurn, setCpuTurn] = useState(false);
  const [cpuNextMove, setCpuNextMove] = useState({});
  const [cpuLastMove, setCpuLastMove] = useState({});

  const [isDraw, setIsDraw] = useState(false);
  const [pause, setPause] = useState(false);
  const [startingPlayer, setStartingPlayer] = useState("");
  const [winner, setWinner] = useState("");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [winningPositions, setWinningPositions] = useState<number[][]>([]);

  const [pOneScore, setPOneScore] = useState(0);
  const [pTwoScore, setPTwoScore] = useState(0);
  const [drawCount, setDrawCount] = useState(0);

  const { gameMode } = useContext(GameModeContext);
  const { playerMark, setPlayerMark } = useContext(PlayerContext);

  useEffect(() => {
    if (winningPositions.length) return;

    if (isInitialRender && playerMark) {
      setStartingPlayer(playerMark);
      setIsInitialRender(false);
    } else {
      handleCPUTurn();
    }

    checkIfDraw(board);
  }, [cpuTurn, isInitialRender, winningPositions]);

  const switchPlayerMark = () => {
    setPlayerMark(playerMark === "x" ? "o" : "x");
  };

  const checkIfDraw = (currentBoard: BoardArr) => {
    const availableTiles = getAvailableTiles(currentBoard);

    const hasWinner = winningPositions.length > 0;

    if (availableTiles.length === 0 && !hasWinner) {
      setIsDraw(true);
      setDrawCount((prevCount) => prevCount + 1);
    }
  };

  const handleTileClick = (row: number, column: number) => {
    if (winningPositions.length || !board || cpuTurn) {
      return;
    }

    const newBoard = [...board];

    if (playerMark && !newBoard[row][column] && !cpuTurn) {
      newBoard[row][column] = playerMark;

      setBoard(newBoard);
      switchPlayerMark();

      checkDirections(board, playerMark, {
        performBlock,
        updateWinner,
      });

      if (gameMode === "pvp") return;

      setCpuTurn(true);
    }
  };

  const handleCPUTurn = () => {
    if (cpuTurn && !isInitialRender && board) {
      const cpuMark = playerMark === "x" ? "x" : "o";

      const cpuMove = determineCPUMove(board, cpuNextMove, cpuLastMove);

      setCpuLastMove(cpuMove);

      const cpuTurnPromise = new Promise<void>((resolve) => {
        setTimeout(() => {
          const nextMove = [...board];
          const { row, col } = cpuMove;

          nextMove[row][col] = cpuMark;

          setBoard(nextMove);
          switchPlayerMark();

          checkDirections(board, cpuMark, {
            performBlock,
            updateWinner,
          });

          resolve();
        }, 700);
      });

      cpuTurnPromise.then(() => {
        setCpuTurn(false);
      });
    }
  };

  const startNextRound = () => {
    if (winner === "x") {
      setPOneScore((prevScore) => prevScore + 1);
    } else if (winner === "o") {
      setPTwoScore((prevScore) => prevScore + 1);
    }

    setIsDraw(false);
    setWinner("");
    setWinningPositions([]);
    setBoard(createBoard(15, 15));
  };

  const performBlock = (
    hasThreeInARow: number[][],
    params: CalculateParams
  ) => {
    const { direction, board } = params;

    const isBlockingMove = cpuBlockingMove(hasThreeInARow, direction, board);

    if (isBlockingMove) {
      setCpuNextMove(isBlockingMove);
    }
  };

  const updateWinner = (fiveInARow: number[][], params: CalculateParams) => {
    const { player } = params;

    setWinningPositions(fiveInARow);
    setWinner(player);
  };

  const displayPauseOverlay = () => {
    setPause(!pause);
  };

  return (
    <>
      <RoundOver
        startingPlayer={startingPlayer}
        startNextRound={startNextRound}
        winner={winner}
        draw={isDraw}
        pause={pause}
        displayPause={displayPauseOverlay}
      />

      <div className={styles.container}>
        <div className={styles.gameHeader}>
          <img
            className={styles.logo}
            src={Logo}
            alt="logo"
            width="72"
            height="32"
          />
          <div className={styles.turn}>
            {(playerMark === "x" && <IconX />) || <IconO />} <span>Turn</span>
          </div>
          <Restart onClick={() => setPause(!pause)} />
        </div>
        <div className={styles.gomokuGrid}>
          <Board
            board={board}
            handleTileClick={handleTileClick}
            winningPositions={winningPositions}
          />
        </div>
        <Results
          startingPlayer={startingPlayer}
          drawCount={drawCount}
          playersScore={{ pOneScore, pTwoScore }}
        />
      </div>
    </>
  );
};

export default Game;
