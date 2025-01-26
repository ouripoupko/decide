import { NavLink, Outlet } from 'react-router-dom';
import styles from './Community.module.scss';

const Community = () => {
  const navItems = [
    { path: 'currency', label: 'Currency' },
    { path: 'issues', label: 'Issues' },
    { path: 'members', label: 'Members' },
    { path: 'projects', label: 'Projects' },
    { path: 'decisions', label: 'Decisions' },
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

export default Community;
