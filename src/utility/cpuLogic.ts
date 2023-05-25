import { Maybe } from "../types";
import { BoardArr } from "../types";
import { getAvailableTiles } from "./board";

const setNextCpuMove = (
  params: emptyBlockTile,
  availableTiles: TilePosition[]
): Maybe<TilePosition> => {
  const { nextEmptyColPos, prevEmptyColPos, nextEmptyRowPos, prevEmptyRowPos } =
    params;

  const isNextTileEmpty = availableTiles.some(
    (obj) => obj.row === nextEmptyRowPos && obj.col === nextEmptyColPos
  );

  const isPrevTileEmpty = availableTiles.some(
    (obj) => obj.row === prevEmptyRowPos && obj.col === prevEmptyColPos
  );

  if (isNextTileEmpty) return { row: nextEmptyRowPos, col: nextEmptyColPos };

  if (isPrevTileEmpty) return { row: prevEmptyRowPos, col: prevEmptyColPos };

  return null;
};

export const cpuBlockingMove = (
  potentialWinningPositions: number[][],
  direction: Direction,
  board: BoardArr
) => {
  const threeInARow = 3;

  const availableTiles = getAvailableTiles(board);

  if (potentialWinningPositions.length === threeInARow) {
    const lastPotentialPosition = potentialWinningPositions[threeInARow - 1];
    const [lastRow, lastCol] = lastPotentialPosition;

    switch (direction) {
      case Direction.Horizontal:
        return setNextCpuMove(
          {
            nextEmptyColPos: lastCol + 1,
            prevEmptyColPos: lastCol - threeInARow,
            nextEmptyRowPos: lastRow,
            prevEmptyRowPos: lastRow,
          },
          availableTiles
        );

      case Direction.Vertical:
        return setNextCpuMove(
          {
            nextEmptyColPos: lastCol,
            prevEmptyColPos: lastCol,
            nextEmptyRowPos: lastRow + 1,
            prevEmptyRowPos: lastRow - threeInARow,
          },
          availableTiles
        );

      case Direction.Diagonal:
        return setNextCpuMove(
          {
            nextEmptyColPos: lastCol + 1,
            prevEmptyColPos: lastCol - threeInARow,
            nextEmptyRowPos: lastRow + 1,
            prevEmptyRowPos: lastRow - threeInARow,
          },
          availableTiles
        );

      case Direction.AntiDiagonal:
        return setNextCpuMove(
          {
            nextEmptyColPos: lastCol - 1,
            prevEmptyColPos: lastCol + threeInARow,
            nextEmptyRowPos: lastRow + 1,
            prevEmptyRowPos: lastRow - threeInARow,
          },
          availableTiles
        );
    }
  }
  return null;
};

const cpuFirstMove = (board: BoardArr) => {
  const availableTiles = getAvailableTiles(board);

  if (availableTiles.length === 225) {
    const centerRow = Math.floor(board.length / 2);
    const centerCol = Math.floor(board[0].length / 2);

    const offsetRow = Math.floor(Math.random() * 3) - 1;
    const offsetCol = Math.floor(Math.random() * 3) - 1;

    const cpuRow = centerRow + offsetRow;
    const cpuCol = centerCol + offsetCol;
    return { row: cpuRow, col: cpuCol };
  }

  return null;
};

const getRandomNumber = () => {
  return Math.floor(Math.random() * 4);
};

export const determineCPUMove = (
  board: BoardArr,
  nextMove: TilePosition | Record<string, never>,
  cpuLastMove: TilePosition | Record<string, never>
) => {
  const availableTiles = getAvailableTiles(board);

  const isFirstMove = cpuFirstMove(board); 

  if (isFirstMove) {
    return isFirstMove;
  }

  if (Object.keys(nextMove).length !== 0) {
    const { row, col } = nextMove;

    const freeTile = availableTiles.some(
      (obj) => obj.row === row && obj.col === col
    );

    if (freeTile) return nextMove;
  }

  if (Object.keys(cpuLastMove).length !== 0) {
    const { row, col } = cpuLastMove;

    const randomDirections = [
      {
        row: row + 1,
        col: col + 1,
      },
      {
        row: row,
        col: col + 1,
      },
      {
        row: row + 1,
        col: col,
      },
      {
        row: row + 1,
        col: col - 1,
      },
    ];

    const newMove = randomDirections[getRandomNumber()];

    const freeTile = availableTiles.some(
      (obj) => obj.row === newMove.row && obj.col === newMove.col
    );
    if (freeTile) return newMove;
  }

  const randomIndex = Math.floor(Math.random() * availableTiles.length);
  return availableTiles[randomIndex];
};

interface emptyBlockTile {
  nextEmptyColPos: number;
  prevEmptyColPos: number;
  nextEmptyRowPos: number;
  prevEmptyRowPos: number;
}

interface TilePosition {
  row: number;
  col: number;
}

enum Direction {
  Horizontal,
  Vertical,
  Diagonal,
  AntiDiagonal,
}
