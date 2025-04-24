import styles from "./Issues.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { readIssuesContract, readIssues } from "src/reducers/issuesSlice";
import { callbackRegistry } from "src/reducers/serverListener";
import { addIssueToServer, joinIssuesContract } from "src/server/issuesApi";
import { AppDispatch, RootState } from "src/Store";

const IssuesPage = () => {
  const { server, agent, allContracts } = useSelector(
    (state: RootState) => state.gloki
  );
  const communityContract = useSelector(
    (state: RootState) => state.community.contract
  );
  const { invite, contractExists, issues } = useSelector(
    (state: RootState) => state.issues
  );
  const [newIssue, setNewIssue] = useState("");
  const [joinRequested, setJoinRequested] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const updateIssue = (issue: string) => {
    setNewIssue(issue);
  };

  const addNewIssue = () => {
    if (server && agent && invite?.contract && newIssue.trim() !== "") {
      addIssueToServer(server, agent, invite.contract, newIssue);
      setNewIssue("");
    }
  };

  useEffect(() => {
    if (invite.contract && !contractExists) {
      dispatch(readIssuesContract());
    }
  }, [dispatch, allContracts]);

  useEffect(() => {
    if (communityContract) {
      dispatch(readIssuesContract());
    }
  }, [dispatch, communityContract]);

  useEffect(() => {
    if (contractExists && invite.contract) {
      callbackRegistry.onWrite[invite.contract] = () => {
        dispatch(readIssues());
      };

      dispatch(readIssues());

      return () => {
        // Unregister the listener
        if (invite.contract) {
          delete callbackRegistry.onWrite[invite.contract];
        }
      };
    }
  }, [dispatch, contractExists]);

  const joinIssues = async () => {
    if (server && agent && invite) {
      setJoinRequested(true);
      await joinIssuesContract(server, agent, invite);
    }
  };

  return contractExists ? (
    <div className={styles["issues"]}>
      <h1 className={styles["title"]}>Issues</h1>
      <div className={styles["new-issue"]}>
        <h2 className={styles["input-title"]}> Subject</h2>
        <textarea
          className={styles["issue-name-input"]}
          placeholder="What is your issue..."
          onChange={(e) => updateIssue(e.target.value)}
          value={newIssue}
        ></textarea>
        <button className={styles["add-issue"]} onClick={addNewIssue}>
          Submit
        </button>
      </div>
      <div className={styles["issues-list"]}>
        {issues?.map((issue, index) => (
          <div
            className={styles["issue"]}
            key={index}
            onClick={() => navigate(`/issue/${issue.contract}`)}
          >
            {issue.name}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <button disabled={joinRequested} onClick={joinIssues}>
      Join
    </button>
  );
};

export default IssuesPage;
