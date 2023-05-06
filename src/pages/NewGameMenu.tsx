import { Button, ButtonVariant } from "../components/buttons/Button";
import PlayerSelection from "../components/PlayerSelection";
import styles from "../styles/NewGameMenu.module.scss";
import Logo from "../assets/logo.svg";

const NewGameMenu = () => {
  const { Yellow, Blue } = ButtonVariant;
  return (
    <div className={styles.container}>
      <img src={Logo} alt="logo" />
      <PlayerSelection />
      <Button variant={Yellow}>New Game (vs cpu)</Button>
      <Button variant={Blue}>New Game (vs Player)</Button>
    </div>
  );
};

export default NewGameMenu;
