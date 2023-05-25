import { useContext } from "react";
import { PlayerContext } from "../Contexts";

import styles from "../styles/PlayerSelection.module.scss";
import IconO from "./icons/IconO";
import IconX from "./icons/IconX";

const PlayerSelection = () => {
  const { playerMark, setPlayerMark } = useContext(PlayerContext);

  const xPicked = playerMark === "x" ? styles.picked : "";
  const oPicked = playerMark === "o" ? styles.picked : "";

  return (
    <div className={styles.box}>
      <h3>Pick player 1's mark</h3>

      <div className={styles.switch}>
        <div className={xPicked} onClick={() => setPlayerMark("x")}>
          <IconX />
        </div>
        <div className={oPicked} onClick={() => setPlayerMark("o")}>
          <IconO />
        </div>
      </div>

      <h4>Gomoku, also called Five in a Row</h4>
    </div>
  );
};

export default PlayerSelection;
