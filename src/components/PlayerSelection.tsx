import styles from "../styles/PlayerSelection.module.scss";
import IconX from "./icons/IconX";
import IconO from "./icons/IconO";

const PlayerSelection = () => {
  return (
    <div className={styles.box}>
      <h3>Pick player 1's mark</h3>

      <div className={styles.switch}>
        <div>
          <IconX />
        </div>
        <div>
          <IconO />
        </div>
      </div>
      <h4>Remember: X Goes first</h4>
    </div>
  );
};

export default PlayerSelection;
