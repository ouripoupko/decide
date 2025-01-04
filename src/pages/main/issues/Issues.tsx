import styles from "./Issues.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIssues } from "src/reducers/GlokiSlice";
import { addIssueToServer } from "src/server/glokiAPI";
import { AppDispatch, RootState } from "src/Store";

const IssuesPage = () => {
  const { agent, server, contract, contacts, issues } = useSelector(
    (state: RootState) => {
      return state?.gloki;
    }
  );
  const [newIssue, setNewIssue] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const updateIssue = (issue: string) => {
    setNewIssue(issue);
  };

  const addNewIssue = () => {
    if (server && agent && contract && newIssue.trim() !== "") {
      addIssueToServer(server, agent, contract, newIssue);
      setNewIssue("");
    }
  };

  useEffect(() => {
    if (contract && contacts) {
      dispatch(getIssues());
    }
  }, [dispatch, contract, contacts]);

  return (
      <div className={styles["issues"]}>
        <h1 className={styles["title"]}>Issues</h1>
        <div className={styles["new-issue"]}>
          <h2 className={styles["input-title"]}> Subject</h2>
          <textarea className={styles["issue-name-input"]}
            placeholder="Your point for discussion..."
            onChange={(e) => updateIssue(e.target.value)}
            defaultValue={newIssue}
          ></textarea>
          <button className={styles["add-issue"] } onClick={addNewIssue}>Submit</button>
        </div>
        <div className={styles["issues-list"]}>
          {issues?.map((issue, index) => (
              <div className={styles["issue"]} key={index}>{issue}</div>
          ))}
        </div>
      </div>
  );
};

export default IssuesPage;
