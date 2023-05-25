import RestartIc from "../../../src/assets/icon-restart.svg";
import styles from "../../styles/RestartBtn.module.scss";

interface RestartProps {
  onClick?: () => void;
}

const Restart = ({ onClick }: RestartProps) => {
  return (
    <button onClick={onClick} className={styles.button}>
      <img src={RestartIc} alt="restart" />
    </button>
  );
};

export default Restart;
