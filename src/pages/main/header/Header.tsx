import styles from "./Header.module.scss";
import hamburgerIcon from "../../../assets/icons/hamburger-menu.svg";
import glokiIcon from "../../../assets/icons/gloki-logo.svg";
import { FC } from "react";

interface HeaderProps {
  onMenuToggle: () => void
}

const Header: FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <img 
            src={glokiIcon}
            alt="Logo" 
            className={styles.icon}
          />
          <img
            onClick={onMenuToggle} // Use the prop to toggle the menu
            src={hamburgerIcon}
            alt="Menu" 
            className={styles.icon}
          />
        </div>
      </div>
      <div className={styles.headerOutline} />
    </div>
  );
};

export default Header;
