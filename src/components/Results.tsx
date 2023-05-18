import { useContext } from "react";
import { GameModeContext } from "../Contexts";

interface ResultsProps {
  playerType: string | null;
}

const Results = ({ playerType }: ResultsProps) => {
  const { gameMode } = useContext(GameModeContext);

  const playerOne = playerType === "x" ? "p1" : "p2";
  const playerTwo = gameMode === "pvp" ? "p2" : "cpu";

  return (
    <div>
      <div>
        <p>
          {playerType} <span>({playerOne})</span>
        </p>
      </div>

      <div>
        <p>
          {playerType} <span>(draw)</span>
        </p>
      </div>

      <div>
        <p>
          {playerType} <span>({playerTwo})</span>
        </p>
      </div>
    </div>
  );
};

export default Results;
