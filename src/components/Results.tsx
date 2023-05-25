import { useContext } from "react";
import { GameModeContext } from "../Contexts";

import styles from "../styles/Results.module.scss";

const Results = ({ drawCount, playersScore }: ResultsProps) => {
  const { gameMode } = useContext(GameModeContext);

  const playerOne = gameMode === "pvp" ? "p1" : "you";
  const playerTwo = gameMode === "pvp" ? "p2" : "cpu";
  const { pOneScore, pTwoScore } = playersScore;

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
  drawCount: number;
  playersScore: {
    pOneScore: number;
    pTwoScore: number;
  };
}
