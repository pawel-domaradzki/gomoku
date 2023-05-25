import { useContext, useEffect, useState } from "react";
import { GameModeContext } from "../Contexts";
import { useNavigate } from "react-router-dom";

import { Button, ButtonVariant } from "../components/buttons/Button";
import PlayerSelection from "../components/PlayerSelection";

import styles from "../styles/NewGameMenu.module.scss";
import Logo from "../assets/logo.svg";
import useLocalStorage from "../hooks/useLocalStorage";

const NewGameMenu = () => {
  const [, setStorageName] = useLocalStorage("gameMode", "");
  const [switchMode, setSwitchMode] = useState(false);
  const { gameMode, setGameMode } = useContext(GameModeContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (switchMode) {
      if (gameMode === "pvp" || gameMode === "cpu") {
        navigate("/game");
      }
    }
  }, [switchMode]);

  const selectCpuGameMode = (mode: string) => {
    setSwitchMode(!switchMode);
    setGameMode(mode);
    setStorageName(mode);
  };

  const { Yellow, Blue } = ButtonVariant;
  return (
    <div className={styles.container}>
      <img src={Logo} alt="logo" width="72" height="32" />
      <PlayerSelection />

      <Button onClick={() => selectCpuGameMode("cpu")} variant={Yellow}>
        New Game (vs cpu)
      </Button>

      <Button onClick={() => selectCpuGameMode("pvp")} variant={Blue}>
        New Game (vs Player)
      </Button>
    </div>
  );
};

export default NewGameMenu;
