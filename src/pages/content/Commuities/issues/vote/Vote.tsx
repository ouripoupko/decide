import { useState, useEffect } from 'react';
import { useDragLayer, useDrop, useDrag } from 'react-dnd';
import styles from './Vote.module.scss';
import { submitVote } from 'src/reducers/issueSlice';

type VotePropsType = {
  issue?: {
    proposals: {id: string}[],
    votes: {[key: string]: any}
  }
}

const Vote = ({ issue }: VotePropsType) => {
  const { agent } = {agent: "someone"} //useSelector(state => state.auth);
  const { loading, error } = {loading: false, error: false} //useSelector(state => state.issue);
  const [proposals, setProposals] = useState([] as {id: string}[]);
  const [hasVoted, setHasVoted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    if (issue && issue.proposals) {
      // Make a copy of the proposals to work with
      setProposals([...issue.proposals]);
      
      // Check if the user has already voted
      if (issue.votes && issue.votes[agent]) {
        setHasVoted(true);
      }
    }
  }, [issue, agent]);
  
  const handleDragEnd = (result: any) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }
    
    const items = [...proposals];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setProposals(items);
  };
  
  const handleSubmitVote = async () => {
    if (submitting) return;
    
    setSubmitting(true);
    
    try {
      // Create a ranking of proposal IDs in the current order
      const ranking = proposals.map(proposal => proposal.id);
      
      // Submit the vote
      await submitVote(ranking);
      
      setHasVoted(true);
    } catch (error) {
      console.error('Error submitting vote:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  // If no proposals, show empty state
  if (!proposals || proposals.length === 0) {
    return (
      <div className={styles.voteContainer}>
        <div className={styles.emptyProposals}>
          <h3>No Proposals to Vote On</h3>
          <p>There are no proposals for this issue yet. Go to the Proposals tab to create one.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.voteContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Vote on Proposals</h2>
        <p className={styles.instructions}>
          Drag and drop proposals to rank them in your preferred order.
          Your most preferred solution should be at the top.
        </p>
      </div>
      
      {error && <div className={styles.error}>{error}</div>}
      
      {hasVoted ? (
        <div className={styles.votedMessage}>
          <h3>Your Vote Has Been Recorded</h3>
          <p>Thank you for voting. You can view the current outcome in the Outcome tab.</p>
          <p className={styles.changeVoteNote}>You can change your vote by re-ordering and submitting again.</p>
        </div>
      ) : null}
      
      {/* <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="proposals">
          {(provided) => (
            <ul
              className={styles.proposalsList}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {proposals.map((proposal, index) => (
                <Draggable
                  key={proposal.id}
                  draggableId={proposal.id}
                  index={index}
                >
                  {(provided) => (
                    <li
                      className={styles.proposalItem}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className={styles.rankBadge}>{index + 1}</div>
                      <div className={styles.proposalContent}>
                        <div className={styles.proposalText}>
                          {proposal.text.length > 100
                            ? `${proposal.text.substring(0, 100)}...`
                            : proposal.text}
                        </div>
                        <div className={styles.proposalAuthor}>
                          By: {proposal.author}
                        </div>
                      </div>
                      <div className={styles.dragHandle}>
                        ⋮⋮
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext> */}
      
      <div className={styles.actions}>
        <button
          className={styles.submitButton}
          onClick={handleSubmitVote}
          disabled={loading || submitting}
        >
          {submitting ? 'Submitting...' : hasVoted ? 'Update Vote' : 'Submit Vote'}
        </button>
      </div>
    </div>
  );
};

export default Vote;
