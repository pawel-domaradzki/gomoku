import { useContext } from "react";
import { GameModeContext } from "../Contexts";
import IconX from "./icons/IconX";
import IconO from "./icons/IconO";
import styles from "../styles/RoundOver.module.scss";
import classNames from "classnames";
import { Button, ButtonVariant } from "./buttons/Button";
import { Link } from "react-router-dom";

interface RoundOverProps {
  startNextRound: () => void;
  winner: string;
}

const { Yellow } = ButtonVariant;

const RoundOver = ({ startNextRound, winner }: RoundOverProps) => {
  const { gameMode } = useContext(GameModeContext);

  const colorStyle = winner || "x";

  const isVisible = winner === "o" || winner === "x" ? true : false;

  const printMsg = () => {
    if (gameMode === "cpu") {
      return "you won!";
    }

    return `player ${winner} win`;
  };

  const overlayStyles = classNames(styles.overlay, {
    [styles.visible]: isVisible,
  });

  const displayIcon = winner === "x" ? <IconX filled /> : <IconO filled />;

  return (
    <div className={overlayStyles}>
      <div className={styles.roundOver}>
        <h3>{printMsg()}</h3>
        <div className={styles.takesRound}>
          {winner && displayIcon}{" "}
          <div className={styles[colorStyle]}>takes the round</div>
        </div>
        <div className={styles.nextRound}>
          <Link to="/">
            <Button>quit</Button>
          </Link>
          <Button onClick={startNextRound} variant={Yellow}>
            next round
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoundOver;
