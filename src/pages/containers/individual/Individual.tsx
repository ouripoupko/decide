import styles from "./Individual.module.scss";
import { NavLink, Outlet } from "react-router-dom";

const Individual = () => {

  const navItems = [
    { path: 'profile', label: 'Profile' },
    { path: 'communities', label: 'Communities' },
    { path: 'find', label: 'Find' },
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.navBar}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default Individual;
