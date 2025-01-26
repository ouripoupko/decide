import styles from "./Profile.module.scss";
import copyIcon from "../../../../src/assets/icons/Copy_Icon.svg";

type AgentCredentialsProps = {
  server: string | undefined;
  agent: string | undefined;
};

export default function AgentCredentials({
  server,
  agent,
}: AgentCredentialsProps) {
  return (
    <>
      <div className={styles["field-title"]}>
        <span>gloKi</span>&emsp;
        <span className={styles["info"]}>?</span>
      </div>
      <div className={styles["field-invert"]}>
        <div className={styles["field-text"]}>{agent || ""}</div>
        <img src={copyIcon} alt="copy icon"></img>
      </div>
      <div className={styles["field-title"]}>
        <span>Storage</span>&emsp;
        <span className={styles["info"]}>?</span>
      </div>
      <div className={styles["field-invert"]}>
        <div className={styles["field-text"]}>{server || ""}</div>
        <img src={copyIcon} alt="copy icon"></img>
      </div>
    </>
  );
}
