import { Button, ButtonVariant } from "../components/buttons/Button";
import PlayerSelection from "../components/PlayerSelection";
import styles from "../styles/NewGameMenu.module.scss";
import Logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { GameModeContext } from "../Contexts";
import { useContext } from "react";

const NewGameMenu = () => {
  const { setGameMode } = useContext(GameModeContext);

  const { Yellow, Blue } = ButtonVariant;
  return (
    <div className={styles.container}>
      <img src={Logo} alt="logo" width="72" height="32" />
      <PlayerSelection />
      <Link to="game">
        <Button onClick={() => setGameMode("cpu")} variant={Yellow}>
          New Game (vs cpu)
        </Button>
      </Link>
      <Link to="game">
        <Button onClick={() => setGameMode("pvp")} variant={Blue}>
          New Game (vs Player)
        </Button>
      </Link>
    </div>
  );
};

export default NewGameMenu;
