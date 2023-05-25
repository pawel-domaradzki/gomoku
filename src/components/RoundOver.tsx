import { useContext } from "react";
import { GameModeContext } from "../Contexts";

import { Link } from "react-router-dom";
import classNames from "classnames";

import { Button, ButtonVariant } from "./buttons/Button";
import IconX from "./icons/IconX";
import IconO from "./icons/IconO";

import styles from "../styles/RoundOver.module.scss";

const RoundOver = ({
  startNextRound,
  winner,
  draw,
  pause,
  displayPause,
  startingPlayer,
}: RoundOverProps) => {
  const { gameMode } = useContext(GameModeContext);

  const display = winner || pause || draw;

  const colorStyle = winner || "draw";

  const printMsg = () => {
    if (draw) return;
    if (gameMode === "cpu") {
      if (winner === startingPlayer) {
        return "you won!";
      } else {
        return "oh No, you lost...";
      }
    }

    return `player ${winner} win`;
  };

  const overlayStyles = classNames(styles.overlay, {
    [styles.visible]: display,
  });

  const displayIcon = winner === "x" ? <IconX filled /> : <IconO filled />;

  return (
    <div className={overlayStyles}>
      <div className={styles.roundOver}>
        <h3>{!pause && printMsg()}</h3>
        <div className={styles.takesRound}>
          {winner && displayIcon}
          <div className={styles[colorStyle]}>
            {(draw && "round tied") ||
              (pause && "Restart Game?") ||
              "takes the round"}
          </div>
        </div>
        <div className={styles.nextRound}>
          {!pause ? (
            <>
              <Link to="/">
                <Button>quit</Button>
              </Link>
              <Button onClick={startNextRound} variant={Yellow}>
                next round
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => displayPause()}>No, cancel</Button>
              <Link to="/">
                <Button onClick={startNextRound} variant={Yellow}>
                  Yes, Restart
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoundOver;

interface RoundOverProps {
  startNextRound: () => void;
  winner: string;
  draw: boolean;
  pause: boolean;
  displayPause: () => void;
  startingPlayer: string;
}

const { Yellow } = ButtonVariant;
