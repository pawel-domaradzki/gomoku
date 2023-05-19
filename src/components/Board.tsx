import { BoardArr } from "../types";
import React, { ReactElement } from "react";
import Tile from "./Tile";

const Board = ({
  board,
  handleTileClick,
  winningPositions,
}: BoardProps): ReactElement => {
  return (
    <>
      {board.map((tiles, row) => (
        <React.Fragment key={row}>
          {tiles.map((el, column) => (
            <Tile
              key={column}
              value={el}
              onTileClick={() => handleTileClick(row, column)}
              winningPositions={winningPositions}
              row={row}
              column={column}
            />
          ))}
        </React.Fragment>
      ))}
    </>
  );
};

export default Board;

interface BoardProps {
  board: BoardArr;
  handleTileClick: (row: number, column: number) => void;
  winningPositions: number[][];
}
