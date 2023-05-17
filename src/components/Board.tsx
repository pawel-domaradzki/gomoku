import Row from "./Row";

const Board = ({ board, handleTileClick }) => {
  return board.map((tiles, index) => (
    <Row
      key={index}
      tiles={tiles}
      row={`${index}`}
      handleTileClick={handleTileClick}
    />
  ));
};

export default Board;
