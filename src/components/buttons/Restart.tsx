import RestartIc from "../../../src/assets/icon-restart.svg";
import styles from "../../styles/RestartBtn.module.scss";

const Restart = () => {
  return (
    <button className={styles.button}>
      <img src={RestartIc} alt="restart" />
    </button>
  );
};

export default Restart;
