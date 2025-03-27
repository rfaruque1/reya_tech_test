import clsx from "clsx";
import styles from "./Sidebar.module.scss";
import fourDotsIcon from "../../assets/icons/FourDots.svg";
import { SidebarProps } from "./types";

export const Sidebar = ({ classNames }: SidebarProps) => {
  return (
    <div className={clsx(styles.container, classNames)}>
      <div className={styles.heroTab}>
        <img src={fourDotsIcon} />
        <p className={styles.heroLabel}>Overview</p>
      </div>
      <div className={styles.description}>
        <span>Portfolio Overview</span>
      </div>
    </div>
  );
};
