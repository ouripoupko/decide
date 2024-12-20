import { useState } from "react";
import styles from "./Main.module.scss";
import Header from "./header/Header";
import { EMainPage } from "src/types/enums";
import Profile from "./profile/Profile";
import FooterNavigator from "./footer/FooterNavigator";
import QrScan from "./qrscan/QrScan";
import Favorites from "./favorites/Favorites";

const Main = () => {
  const [currentView, setCurrentView] = useState(EMainPage.Profile);

  return (
    <div className={styles["main-page"]}>
      <Header></Header>
      <div className={styles["main-content"]}>
        {currentView === EMainPage.Profile && <Profile></Profile>}
        {currentView === EMainPage.Favorites && <Favorites></Favorites>}
        {currentView === EMainPage.Find && <QrScan></QrScan>}
      </div>
      <FooterNavigator setCurrentView={setCurrentView} currentPage={currentView}></FooterNavigator>
    </div>
  );
};

export default Main;
