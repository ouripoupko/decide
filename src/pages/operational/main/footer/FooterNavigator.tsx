import { EMainPage } from "src/types/enums";
import styles from "./FooterNavigator.module.scss";
import { FC } from "react";

// Import your icons
import votesIcon from 'src/assets/icons/votes-footer-icon.svg';
import issueAreasIcon from 'src/assets/icons/issue-areas-footer-icon.svg';
import favoritesIcon from 'src/assets/icons/favorites-footer-icon.svg';
import searchIcon from 'src/assets/icons/search-footer-icon.svg';

interface FooterNavigatorProps {
  setCurrentView: (view: EMainPage) => void;
  currentPage: EMainPage;
}

interface NavItem {
  icon: string;
  label: string;
  view: EMainPage;
}

const FooterNavigator: FC<FooterNavigatorProps> = ({
  setCurrentView,
  currentPage
}) => {
  const navItems: NavItem[] = [
    {
      icon: votesIcon,
      label: 'Votes',
      view: EMainPage.Profile
    },
    {
      icon: issueAreasIcon,
      label: 'Issue Areas',
      view: EMainPage.Issues
    },
    {
      icon: favoritesIcon,
      label: 'Favorites',
      view: EMainPage.Favorites
    },
    {
      icon: searchIcon,
      label: 'Search',
      view: EMainPage.Find
    }
  ];

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerOutline}/>
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
