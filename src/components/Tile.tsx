import styles from "../styles/Tile.module.scss";
import IconX from "./icons/IconX";
import IconO from "./icons/IconO";

const Tile = ({ value, onTileClick }) => {
  const displayIcon = value === "x" ? <IconX filled /> : <IconO filled />;

  return (
    <div className={`${styles.tile} ${styles[value]}`} onClick={onTileClick}>
      {value && displayIcon}
    </div>
  );
};

export default Tile;
