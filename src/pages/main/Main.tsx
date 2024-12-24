import React, { useState } from "react";
import styles from "./Main.module.scss";
import Header from "./header/Header";
import { EMainPage } from "src/types/enums";
import Profile from "./profile/Profile";
import FooterNavigator from "./footer/FooterNavigator";
import QrScan from "./qrscan/QrScan";
import Favorites from "./favorites/Favorites";
import HamburgerMenu from "./hamburger/HamburgerMenu";

const Main = () => {
  const [currentView, setCurrentView] = useState(EMainPage.Profile);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={styles["main-page"]}>
      <Header onMenuToggle={toggleMenu} />
      <div className={styles["main-content"]}>
        {currentView === EMainPage.Profile && <Profile />}
        {currentView === EMainPage.Favorites && <Favorites />}
        {currentView === EMainPage.Find && <QrScan />}
      </div>
      <FooterNavigator setCurrentView={setCurrentView} currentPage={currentView} />
      {isMenuOpen && <HamburgerMenu onClose={toggleMenu} />}
    </div>
  );
};

export default Main;
