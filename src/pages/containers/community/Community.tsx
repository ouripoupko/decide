import { NavLink, Outlet, useParams } from "react-router-dom";
import styles from "./Community.module.scss";
import { useEffect } from "react";
import { AppDispatch } from "src/Store";
import { useDispatch } from "react-redux";
import { setContract } from "src/reducers/communitySlice";
import { ContainerContextType } from "src/types/types";

const Community = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setContract(id));
  }, [dispatch, id]);

  const navItems = [
    { path: "/me", label: "U" },
    { path: "currency", label: "C" },
    { path: "issues", label: "I" },
    { path: "members", label: "M" },
    { path: "projects", label: "P" },
    { path: "decisions", label: "D" },
    { path: "share", label: "S" },
  ];

  const context = { contract: id } as ContainerContextType;

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
        <Outlet context={context}/>
      </main>
    </div>
  );
};

export default Community;
