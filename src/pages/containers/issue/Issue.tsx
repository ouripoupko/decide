import { NavLink, Outlet, replace, useParams } from "react-router-dom";
import styles from "./Issue.module.scss";
import { useEffect } from "react";
import { AppDispatch } from "src/Store";
import { useDispatch } from "react-redux";
import { ContainerContextType } from "src/types/types";
import { readIssue, setIssueContract } from "src/reducers/issueSlice";

const Issue = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setIssueContract(id));
    dispatch(readIssue());
  }, [dispatch, id]);

  const navItems = [
    { path: "discussion", label: "D", replace: true },
    { path: "proposals", label: "P", replace: true },
    { path: "vote", label: "V", replace: true },
    { path: "outcome", label: "O", replace: true },
    { path: "share", label: "S", replace: true },
  ];

  const context = { contract: id } as ContainerContextType;

  return (
    <div className={styles.container}>
      <nav className={styles.navBar}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            replace={item.replace}
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

export default Issue;
