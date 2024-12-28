import React from "react";
import {ChevronDown} from "lucide-react";
import styles from "./hamburgerMenu.module.scss";
import glokiIcon from "../../../assets/icons/gloki-logo.svg";
import backIcon from "../../../assets/icons/back-icon.svg"

interface MenuItem {
    id: string;
    label: string;
    hasChevron?: boolean;
}

const menuItems: MenuItem[] = [
    {id: "rewards", label: "Rewards"},
    {id: "delegates", label: "Delegates"},
    {id: "profile", label: "Profile"},
    {id: "about", label: "About", hasChevron: true},
    {id: "glo", label: "$GLO"},
    {id: "privacy", label: "Privacy"},
    {id: "settings", label: "Settings"},
];

interface HamburgerProps {
    onClose: () => void,
    classNameState: string
}

const Hamburger: React.FC<HamburgerProps> = ({onClose, classNameState}) => {
    return (
        <div className={styles["menu"] + " " + styles[classNameState]}>
            <div className={styles["header"]}>
                <div className={styles["logo"]}>
                    <img src={glokiIcon}/>
                </div>
                <img src={backIcon} className={styles.closeButton} onClick={onClose}/>
            </div>

            <nav>
                <ul className={styles.nav}>
                    {menuItems.map(({id, label, hasChevron}) => (
                        <li key={id} className={styles.navItem}>
                            <div className={styles["menu-item"]}>
                                <span className={styles.bullet}></span>
                                {label}
                                {hasChevron && (
                                    <ChevronDown size={20} className={styles.chevronRight}/>
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
