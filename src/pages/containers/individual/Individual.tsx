import { useState } from "react";
import styles from "./Individual.module.scss";
import Header from "./header/Header";
import { EPages } from "src/types/enums";
import Profile from "../../content/profile/Profile";
import HamburgerMenu from "./hamburger/HamburgerMenu";
import Communities from "src/pages/content/Commuities/Communities";

const Individual = () => {
  const [currentView, setCurrentView] = useState(EPages.Profile);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen, "isMenuOpen");
  };

  return (
    <div className={styles["main-page"]}>
      <Header onMenuToggle={toggleMenu} />
      <div className={styles["main-content"]}>
        {currentView === EPages.Profile && <Profile />}
        {currentView === EPages.Communities && <Communities />}
      </div>
      <div className={"hamburger-menu-container"}>
        <HamburgerMenu
          onClose={toggleMenu}
          setPage={setCurrentView}
          classNameState={isMenuOpen ? "open" : "closed"}
        />
      </div>
    </div>
  );
};

export default Individual;
