import React from "react";
import { ChevronDown } from "lucide-react";
import styles from "./hamburgerMenu.module.scss";

interface MenuItem {
  id: string;
  label: string;
  hasChevron?: boolean;
}

const menuItems: MenuItem[] = [
  { id: "rewards", label: "Rewards" },
  { id: "delegates", label: "Delegates" },
  { id: "profile", label: "Profile" },
  { id: "about", label: "About", hasChevron: true },
  { id: "glo", label: "$GLO" },
  { id: "privacy", label: "Privacy" },
  { id: "settings", label: "Settings" },
];

interface HamburgerProps {
  onClose: () => void;
}

const Hamburger: React.FC<HamburgerProps> = ({ onClose }) => {
  return (
    <div className={styles.menu}>
      <div className={styles.header}>
        <div className={styles.logo}>
          gl<span className={styles.dot}></span>ki
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
      </div>

      <nav>
        <ul className={styles.nav}>
          {menuItems.map(({ id, label, hasChevron }) => (
            <li key={id} className={styles.navItem}>
              <button className={styles.menuItem}>
                <span className={styles.bullet}></span>
                {label}
                {hasChevron && (
                  <ChevronDown size={20} className={styles.chevronRight} />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Hamburger;
