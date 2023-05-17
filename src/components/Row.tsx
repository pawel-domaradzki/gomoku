import Tile from "./Tile";

const Row = ({ tiles, handleTileClick, row }) => {
  const renderBoard = tiles.map((el, index) => {
    return (
      <Tile
        key={index}
        value={el}
        onTileClick={() => handleTileClick(row, index)}
      />
    );
  });

  return renderBoard;
};
export default Row;
