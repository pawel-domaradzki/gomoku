import styles from "../../styles/Button.module.scss";
import { FC } from "react";

interface ButtonProps {
  variant?: ButtonVariant;
  children: string;
}

export enum ButtonVariant {
  Yellow = "yellow",
  Blue = "blue",
}

export const Button: FC<ButtonProps> = ({ children, variant }) => {
  const colorClass = variant && styles[variant];
  const classes = colorClass
    ? `${styles.button} ${colorClass}`
    : `${styles.button}`;
  return <button className={classes}>{children.toUpperCase()}</button>;
};
