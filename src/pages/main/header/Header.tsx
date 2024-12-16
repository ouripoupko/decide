import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles["header"]}>
      <div>gloKi</div>
      <div>&#9776;</div>
    </div>
  );
};

export default Header;