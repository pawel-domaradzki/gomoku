import Tile from "./Tile";

interface RowProps {
  tiles: string[];
  handleTileClick: (row: number, index: number) => void;
  row: number;
}

const Row = ({ tiles, handleTileClick, row }: RowProps) => {
  return (
    <>
      {tiles.map((el, index) => (
        <Tile
          key={index}
          value={el}
          onTileClick={() => handleTileClick(row, index)}
        />
      ))}
    </>
  );
};
export default Row;
