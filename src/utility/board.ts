import { BoardArr } from "../types";

export const createBoard = (rows: number, columns: number) => {
  const board: BoardArr = [];
  for (let i = 0; i < rows; i++) {
    board.push(Array(columns).fill(null));
  }
  return board;
};

export const getAvailableTiles = (board: BoardArr) => {
  const availableTiles = [];

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === null) {
        availableTiles.push({ row, col });
      }
    }
  }

  return availableTiles;
};
