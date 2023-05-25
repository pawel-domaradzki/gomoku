import { BoardArr } from "../types";

const checkSequence = ({
  row,
  col,
  direction,
  player,
  board,
  sequenceLength,
  callback,
}: CheckSequence) => {
  const sequencePositions = [];

  const { rowDir, colDir } = getDirectionValues(direction);

  for (let i = 0; i < sequenceLength; i++) {
    const currentRow = row + i * rowDir;
    const currentCol = col + i * colDir;

    if (
      currentRow < 0 ||
      currentRow >= board.length ||
      currentCol < 0 ||
      currentCol >= board[0].length ||
      board[currentRow][currentCol] !== player
    ) {
      return;
    }

    sequencePositions.push([currentRow, currentCol]);
  }

  callback(sequencePositions, { direction, player, board });
};

export const calculateSequence = ({
  row,
  col,
  direction,
  player,
  board,
  callback,
  sequenceLength,
}: CheckSequence) => {
  checkSequence({
    row,
    col,
    direction,
    player,
    board,
    sequenceLength,
    callback,
  });
};

const getDirectionValues = (direction: Direction) => {
  switch (direction) {
    case Direction.Horizontal:
      return { rowDir: 0, colDir: 1 };
    case Direction.Vertical:
      return { rowDir: 1, colDir: 0 };
    case Direction.Diagonal:
      return { rowDir: 1, colDir: 1 };
    case Direction.AntiDiagonal:
      return { rowDir: 1, colDir: -1 };
  }
};

export enum Direction {
  Horizontal,
  Vertical,
  Diagonal,
  AntiDiagonal,
}

interface CheckSequence {
  row: number;
  col: number;
  direction: Direction;
  player: string;
  board: BoardArr;
  sequenceLength: number;
  callback: (sequencePositions: number[][], cbArgs: CalculateParams) => void;
}

export interface CalculateParams {
  direction: number;
  player: string;
  board: BoardArr;
}

export const checkDirections = (
  board: BoardArr,
  player: string,
  updates: any
) => {
  const directions = [
    Direction.Horizontal,
    Direction.Vertical,
    Direction.Diagonal,
    Direction.AntiDiagonal,
  ];

  for (const direction of directions) {
    checkDirection(board, player, direction, updates);
  }
};

const checkDirection = (
  board: BoardArr,
  player: string,
  direction: Direction,
  updates: { performBlock: () => void; updateWinner: () => void }
) => {
  const limit = 15;

  const { performBlock, updateWinner } = updates;

  for (let row = 0; row < limit; row++) {
    for (let col = 0; col < limit; col++) {
      calculateSequence({
        row,
        col,
        direction,
        player,
        board,
        sequenceLength: 2,
        callback: performBlock,
      });
      calculateSequence({
        row,
        col,
        direction,
        player,
        board,
        sequenceLength: 3,
        callback: performBlock,
      });
      calculateSequence({
        row,
        col,
        direction,
        player,
        board,
        sequenceLength: 5,
        callback: updateWinner,
      });
    }
  }
};
