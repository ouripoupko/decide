import { useState } from "react";
import styles from "./GdiMain.module.scss";
import Header from "./header/Header";
import FooterNavigator from "./footer/FooterNavigator";
import HamburgerMenu from "./hamburger/HamburgerMenu";
import { Outlet } from "react-router-dom";

const GdiMain = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen, "isMenuOpen");
  };

  return (
    <div className={styles["main-page"]}>
      <Header onMenuToggle={toggleMenu} />
      <div className={styles["main-content"]}>
        <Outlet />
      </div>
      <FooterNavigator />
      <div className={"hamburger-menu-container"}>
        <HamburgerMenu
          onClose={toggleMenu}
          classNameState={isMenuOpen ? "open" : "closed"}
        />
      </div>
    </div>
  );
};

export default GdiMain;
