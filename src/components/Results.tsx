import { useContext } from "react";
import { GameModeContext } from "../Contexts";

import styles from "../styles/Results.module.scss";

const Results = ({ drawCount, playersScore, startingPlayer }: ResultsProps) => {
  const { gameMode } = useContext(GameModeContext);

  const { pOneScore, pTwoScore } = playersScore;

  const displayPlayers = () => {
    if (gameMode === "pvp") return { playerOne: "p1", playerTwo: "p2" };
    const playerOne = startingPlayer === "x" ? "you" : "cpu";
    const playerTwo = startingPlayer === "o" ? "you" : "cpu";
    return { playerOne, playerTwo };
  };

  const { playerOne, playerTwo } = displayPlayers();

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.p1}>
        <p>
          X <span>({playerOne})</span>
        </p>
        <h2>{pOneScore}</h2>
      </div>

      <div className={styles.ties}>
        <p>Ties</p>
        <h2>{drawCount}</h2>
      </div>

      <div className={styles.p2}>
        <p>
          O <span>({playerTwo})</span>
        </p>
        <h2>{pTwoScore}</h2>
      </div>
    </div>
  );
};

export default Results;

interface ResultsProps {
  startingPlayer: string;
  drawCount: number;
  playersScore: {
    pOneScore: number;
    pTwoScore: number;
  };
}
