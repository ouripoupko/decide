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
    <>
      <input
        onChange={(e) => updateIssue(e.target.value)}
        defaultValue={newIssue}
      ></input>
      <button onClick={addNewIssue}>Add</button>
      {issues?.map((issue, index) => (
        <div key={index}>{issue}</div>
      ))}
    </>
  );
};

export default IssuesPage;
