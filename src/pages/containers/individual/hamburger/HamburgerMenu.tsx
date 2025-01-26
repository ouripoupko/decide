import React from "react";
import { ChevronDown } from "lucide-react";
import styles from "./HamburgerMenu.module.scss";
import glokiIcon from "src/assets/icons/gloki-logo.svg";
import backIcon from "src/assets/icons/back-icon.svg";
import { EPages } from "src/types/enums";

interface MenuItem {
  id: string;
  label: string;
  page: EPages;
  hasChevron?: boolean;
}

const menuItems: MenuItem[] = [
  { id: "profile", label: "Profile", page: EPages.Profile },
  { id: "communities", label: "Communities", page: EPages.Communities },
];

interface HamburgerProps {
  onClose: () => void;
  setPage: (page: EPages) => void;
  classNameState: string;
}

const Hamburger: React.FC<HamburgerProps> = ({
  onClose,
  setPage,
  classNameState,
}) => {
  return (
    <div className={styles["menu"] + " " + styles[classNameState]}>
      <div className={styles["header"]}>
        <div className={styles["logo"]}>
          <img src={glokiIcon} />
        </div>
        <img src={backIcon} className={styles.closeButton} onClick={onClose} />
      </div>

      <nav>
        <ul className={styles.nav}>
          {menuItems.map(({ id, label, page, hasChevron }) => (
            <li key={id} className={styles.navItem}>
              <div
                className={styles["menu-item"]}
                onClick={() => {
                  onClose();
                  setPage(page);
                }}
              >
                <span className={styles.bullet}></span>
                {label}
                {hasChevron && (
                  <ChevronDown size={20} className={styles.chevronRight} />
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Hamburger;
