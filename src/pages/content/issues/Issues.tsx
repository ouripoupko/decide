import styles from "./Issues.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  readDiscussionContract,
  readIssues,
} from "src/reducers/discussionSlice";
import { callbackRegistry } from "src/reducers/serverListener";
import {
  addIssueToServer,
  joinDiscussionContract,
} from "src/server/discussionApi";
import { AppDispatch, RootState } from "src/Store";

const IssuesPage = () => {
  const { server, agent } = useSelector((state: RootState) => state.gloki);
  const communityContract = useSelector(
    (state: RootState) => state.community.contract
  );
  const { invite, contractExists, issues } = useSelector(
    (state: RootState) => state.discussion
  );
  const [newIssue, setNewIssue] = useState("");
  const [joinRequested, setJoinRequested] = useState(false);
  const dispatch: AppDispatch = useDispatch();

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
    if (communityContract) {
      dispatch(readDiscussionContract());
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

  const joinDiscussion = async () => {
    if (server && agent && invite) {
      setJoinRequested(true);
      await joinDiscussionContract(server, agent, invite);
    }
  };

  return contractExists ? (
    <div className={styles["issues"]}>
      <h1 className={styles["title"]}>Issues</h1>
      <div className={styles["new-issue"]}>
        <h2 className={styles["input-title"]}> Subject</h2>
        <textarea
          className={styles["issue-name-input"]}
          placeholder="Your point for discussion..."
          onChange={(e) => updateIssue(e.target.value)}
          value={newIssue}
        ></textarea>
        <button className={styles["add-issue"]} onClick={addNewIssue}>
          Submit
        </button>
      </div>
      <div className={styles["issues-list"]}>
        {issues?.map((issue, index) => (
          <div className={styles["issue"]} key={index}>
            {issue}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <button
      className={styles.button}
      disabled={joinRequested}
      onClick={joinDiscussion}
    >
      Join
    </button>
  );
};

export default IssuesPage;
