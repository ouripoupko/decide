import { EMainPage } from "src/types/enums";
import styles from "./FooterNavigator.module.scss";
import React from "react";

// Import your icons
import profileIcon from 'src/assets/icons/profile-footer-button.svg';
import communitiesIcon from 'src/assets/icons/communities-footer-button.svg';

interface FooterNavigatorProps {
  setCurrentView: (view: EMainPage) => void;
  currentPage: EMainPage;
}

interface NavItem {
  icon: string;
  label: string;
  view: EMainPage;
}

const FooterNavigator: React.FC<FooterNavigatorProps> = ({
  setCurrentView,
  currentPage
}) => {
  const navItems: NavItem[] = [
    {
      icon: profileIcon,
      label: 'Votes',
      view: EMainPage.Profile
    },
    {
      icon: profileIcon,
      label: 'Issue Areas',
      view: EMainPage.Communities
    },
    {
      icon: profileIcon,
      label: 'Favorites',
      view: EMainPage.AddCommunity
    },
    {
      icon: communitiesIcon,
      label: 'Search',
      view: EMainPage.Find
    }
  ];

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerOutline}></div>
      <div className={styles.footer}>
        <div className={styles.navContainer}>
          {navItems.map((item) => (
            <div
              key={item.view}
              className={`${styles.navItem} ${
                currentPage === item.view ? styles.active : ""
              }`}
              onClick={() => setCurrentView(item.view)}
            >
              <div className={styles.iconWrapper}>
                <img src={item.icon} alt={item.label} />
              </div>
              <span className={styles.label}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterNavigator;
