import styles from "./FooterNavigator.module.scss";
import { FC } from "react";

// Import your icons
import votesIcon from "src/assets/icons/votes-footer-icon.svg";
import issueAreasIcon from "src/assets/icons/issue-areas-footer-icon.svg";
import favoritesIcon from "src/assets/icons/favorites-footer-icon.svg";
import searchIcon from "src/assets/icons/search-footer-icon.svg";
import { NavLink } from "react-router-dom";

interface NavItem {
  icon: string;
  label: string;
  path: string;
}

const FooterNavigator: FC = () => {
  const navItems: NavItem[] = [
    {
      icon: votesIcon,
      label: "Votes",
      path: "profile",
    },
    {
      icon: issueAreasIcon,
      label: "Issue Areas",
      path: "issues",
    },
    {
      icon: favoritesIcon,
      label: "Favorites",
      path: "favorites",
    },
    {
      icon: searchIcon,
      label: "Search",
      path: "find",
    },
  ];

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerOutline} />
      <div className={styles.footer}>
        <div className={styles.navContainer}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ""}`
              }
            >
              <div className={styles.iconWrapper}>
                <img src={item.icon} alt={item.label} />
              </div>
              <span className={styles.label}>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterNavigator;
