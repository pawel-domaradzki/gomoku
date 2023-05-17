import styles from "../../styles/Button.module.scss";
import { FC } from "react";

interface ButtonProps {
  variant?: ButtonVariant;
  children: string;
  onClick?: () => void;
}

export enum ButtonVariant {
  Yellow = "yellow",
  Blue = "blue",
}

export const Button: FC<ButtonProps> = ({ children, variant, onClick }) => {
  const colorClass = variant && styles[variant];
  const classes = colorClass
    ? `${styles.button} ${colorClass}`
    : `${styles.button}`;
  return (
    <button className={classes} onClick={onClick}>
      {children.toUpperCase()}
    </button>
  );
};
