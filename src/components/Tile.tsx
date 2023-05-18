import styles from "../styles/Tile.module.scss";
import IconX from "./icons/IconX";
import IconO from "./icons/IconO";

interface TileProps {
  value: string;
  onTileClick: () => void;
}

const Tile = ({ value, onTileClick }: TileProps) => {
  const displayIcon = value === "x" ? <IconX filled /> : <IconO filled />;

  return (
    <div className={`${styles.tile} ${styles[value]}`} onClick={onTileClick}>
      {value && displayIcon}
    </div>
  );
};

export default Tile;
