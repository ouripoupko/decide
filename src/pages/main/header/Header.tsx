import styles from "./Header.module.scss";
import hamburgerIcon from "../../../assets/icons/hamburger-menu.svg";
import glokiIcon from "../../../assets/icons/gloki-logo.svg";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <img 
            src={glokiIcon} // Use the imported glokiIcon here
            alt="Logo" 
            className={styles.icon}
          />
          <img 
            src={hamburgerIcon} // Use the imported hamburgerIcon here
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
