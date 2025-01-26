import { RootState } from "src/Store";
import AgentCredentials from "./AgentCredentials";
import styles from "./Profile.module.scss";
import { useSelector } from "react-redux";
import { CompWithChildrenProps } from "src/types/types";

export default function ViewProfile({ children }: CompWithChildrenProps) {
  const { agent, server, profile } = useSelector((state: RootState) => {
    return state?.gloki;
  });
  const { userPhoto, firstName, lastName, userBio } = profile || {};

  return (
    <>
      {userPhoto ? (
        <img
          className={styles["image-container"]}
          src={userPhoto}
          alt="Profile"
        ></img>
      ) : (
        <div className={styles["image-container"]}></div>
      )}
      <div className={styles["agent-name"]}>
        {firstName || ""} {lastName || ""}
      </div>

      {
        // the buttons
        children
      }
      <div className={styles["profile-fields"]}>
        <div className={styles["field-title"]}>Bio</div>
        {userBio ? (
          <div className={styles["field-paragraph"]}>{userBio}</div>
        ) : (
          <div className={styles["field-paragraph"]}>
            You can write your bio here
          </div>
        )}
        <AgentCredentials server={server} agent={agent}></AgentCredentials>
      </div>
    </>
  );
}
