import classNames from "classnames";
import styles from "../styles/Tile.module.scss";
import IconX from "./icons/IconX";
import IconO from "./icons/IconO";

interface TileProps {
  value: string;
  onTileClick: () => void;
  winningPositions: number[][];
  row: number;
  column: number;
}

const Tile = ({
  value,
  onTileClick,
  winningPositions,
  row,
  column,
}: TileProps) => {
  const isHighlighted = winningPositions.some(
    (position) => position[0] === row && position[1] === column
  );

  const tileStyles = classNames(styles.tile, styles[value], {
    [styles.highlighted]: isHighlighted,
  });

  const displayIcon = value === "x" ? <IconX filled /> : <IconO filled />;

  return (
    <div className={tileStyles} onClick={onTileClick}>
      {value && displayIcon}
    </div>
  );
};

export default Tile;
