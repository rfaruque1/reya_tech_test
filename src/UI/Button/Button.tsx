import styles from "./Button.module.scss";
import { ButtonProps } from "./types";
import clsx from "clsx";

const Button = ({ onClick, label, classNames }: ButtonProps) => {
  return (
    <button className={clsx(styles.container, classNames)} onClick={onClick}>
      {label}
    </button>
  );
};

export { Button };
