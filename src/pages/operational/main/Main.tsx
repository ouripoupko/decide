import { useState } from "react";
import styles from "./Main.module.scss";
import Header from "./header/Header";
import { EMainPage } from "src/types/enums";
import Profile from "../../functional/profile/Profile";
import FooterNavigator from "./footer/FooterNavigator";
import QrScan from "../../functional/qrscan/QrScan";
import Favorites from "../../functional/favorites/Favorites";
import HamburgerMenu from "./hamburger/HamburgerMenu";
import Issues from "../../functional/issues/Issues";

const Main = () => {
  const [currentView, setCurrentView] = useState(EMainPage.Profile);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen, "isMenuOpen");
  };

  return (
    <div className={styles["main-page"]}>
      <Header onMenuToggle={toggleMenu} />
      <div className={styles["main-content"]}>
        {currentView === EMainPage.Profile && <Profile />}
        {currentView === EMainPage.Issues && <Issues />}
        {currentView === EMainPage.Favorites && <Favorites />}
        {currentView === EMainPage.Find && <QrScan setCurrentView={setCurrentView}/>}
      </div>
      <FooterNavigator
        setCurrentView={setCurrentView}
        currentPage={currentView}
      />
      <div className={"hamburger-menu-container"}>
        <HamburgerMenu
          onClose={toggleMenu}
          classNameState={isMenuOpen ? "open" : "closed"}
        />
      </div>
    </div>
  );
};

export default Main;
