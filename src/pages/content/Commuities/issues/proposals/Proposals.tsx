import { useState } from "react";
import styles from "./Proposals.module.scss";
import { addProposal } from "src/reducers/issueSlice";
import { AppDispatch } from "src/Store";
import { useDispatch } from "react-redux";

type ProposalsPropType = {
  issue?: {
    proposals: any[];
    creator: string;
  };
};

const Proposals = ({ issue }: ProposalsPropType) => {
  const { loading, error } = { loading: false, error: false }; //useSelector(state => state.issue);
  const [newProposal, setNewProposal] = useState("");
  const [expanded, setExpanded] = useState({} as { [key: string]: Boolean });
  const dispatch: AppDispatch = useDispatch();

  const handleSubmitProposal = async (e: any) => {
    e.preventDefault();
    console.log("handleSubmitProposal", newProposal);

    if (!newProposal.trim()) {
      return;
    }

    dispatch(addProposal(newProposal));
    setNewProposal("");
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const proposals = issue?.proposals || [];

  return (
    <div className={styles.proposalsContainer}>
      <div className={styles.formCard}>
        <h2 className={styles.title}>Add Proposal</h2>
        <p className={styles.description}>
          Propose a solution to this issue. Be clear and specific about what
          should be done.
        </p>

        <form onSubmit={handleSubmitProposal} className={styles.form}>
          <textarea
            value={newProposal}
            onChange={(e) => setNewProposal(e.target.value)}
            placeholder="Enter your proposal..."
            className={styles.textarea}
            rows={6}
            disabled={loading}
            required
          />

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading || !newProposal.trim()}
          >
            {loading ? "Submitting..." : "Submit Proposal"}
          </button>
        </form>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.proposalsList}>
        <h2 className={styles.listTitle}>Proposals ({proposals.length})</h2>

        {proposals.length === 0 ? (
          <div className={styles.emptyProposals}>
            <p>No proposals have been submitted yet.</p>
            <p>Be the first to propose a solution for this issue.</p>
          </div>
        ) : (
          <ul className={styles.list}>
            {proposals.map((proposal) => (
              <li key={proposal.id} className={styles.proposalItem}>
                <div className={styles.proposalHeader}>
                  <div className={styles.proposalAuthor}>
                    By:{" "}
                    {proposal.author === issue?.creator
                      ? "Author"
                      : proposal.author}
                  </div>
                  <div className={styles.proposalDate}>
                    {new Date(proposal.timestamp).toLocaleDateString()}
                  </div>
                </div>

                <div
                  className={`${styles.proposalText} ${
                    expanded[proposal.id] ? styles.expanded : ""
                  }`}
                >
                  {proposal.text}
                </div>

                {proposal.text.length > 200 && !expanded[proposal.id] && (
                  <button
                    className={styles.expandButton}
                    onClick={() => toggleExpand(proposal.id)}
                  >
                    Read More
                  </button>
                )}

                {expanded[proposal.id] && (
                  <button
                    className={styles.expandButton}
                    onClick={() => toggleExpand(proposal.id)}
                  >
                    Show Less
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Proposals;
