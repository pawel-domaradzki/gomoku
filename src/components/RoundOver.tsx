import { useContext } from "react";
import { GameModeContext } from "../Contexts";
import styles from "../styles/RoundOver.module.scss";

const RoundOver = ({ startNextRound, winner }) => {
  const { gameMode } = useContext(GameModeContext);

  const printMsg = () => {
    if (gameMode === "cpu") {
      return "you win";
    }

    return `player ${winner} win`;
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.roundOver}>
        <h3>{printMsg()}</h3>
        <div>icon lsot</div>
        <div className={styles.nextRound}>
          <button>quit</button>
          <button onClick={startNextRound}>next round</button>
        </div>
      </div>
    </div>
  );
};

export default RoundOver;
