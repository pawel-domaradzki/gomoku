import Row from "./Row";
import { BoardArr } from "../types";
import { ReactElement } from "react";

const Board = ({ board, handleTileClick }: BoardProps): ReactElement => {
  return (
    <>
      {board.map((tiles, index) => (
        <Row
          key={index}
          tiles={tiles}
          row={index}
          handleTileClick={handleTileClick}
        />
      ))}
    </>
  );
};

export default Board;

interface BoardProps {
  board: BoardArr;
  handleTileClick: (row: number, column: number) => void;
}
