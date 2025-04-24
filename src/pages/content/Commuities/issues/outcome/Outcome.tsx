import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Outcome.module.scss';
import { loadOutcome } from 'src/reducers/issueSlice';

type OutcomePropsType = {
  issue?: {
    proposals: any[],
    votes: {
      [key: string]: any[]
    },
    id: string
  }
}

const Outcome = ({ issue }: OutcomePropsType) => {
  const dispatch = useDispatch();
  const { outcome, loading, error } = {outcome: [] as {id: string, text: string, author: string}[], loading: false, error: false} //useSelector(state => state.issue);
  
  useEffect(() => {
    if (issue && issue.id) {
      loadOutcome(issue.id);
    }
  }, [dispatch, issue]);
  
  // Calculate vote counts
  const calculateVoteCounts = () => {
    if (!issue || !issue.votes) {
      return {};
    }
    
    const voteCount = {} as {[key: string]: { count: number, percent: number, ranks: number[]}};
    const totalVoters = Object.keys(issue.votes).length;
    
    // Initialize vote count for each proposal
    if (issue.proposals) {
      issue.proposals.forEach(proposal => {
        voteCount[proposal.id] = { 
          count: 0, 
          ranks: Array(issue.proposals.length).fill(0),
          percent: 0
        };
      });
    }
    
    // Count votes by position
    Object.values(issue.votes).forEach(ranking => {
      ranking.forEach((proposalId, index) => {
        if (voteCount[proposalId]) {
          voteCount[proposalId].count += 1;
          voteCount[proposalId].ranks[index] += 1;
        }
      });
    });
    
    // Calculate percentages
    if (totalVoters > 0) {
      Object.keys(voteCount).forEach(proposalId => {
        voteCount[proposalId].percent = (voteCount[proposalId].count / totalVoters) * 100;
      });
    }
    
    return voteCount;
  };
  
  const voteCounts = calculateVoteCounts();
  const totalVotes = issue?.votes ? Object.keys(issue.votes).length : 0;
  
  // Render loading state
  if (loading) {
    return (
      <div className={styles.outcomeContainer}>
        <div className={styles.loading}>Loading outcome data...</div>
      </div>
    );
  }
  
  // If no proposals, show empty state
  if (!issue?.proposals || issue.proposals.length === 0) {
    return (
      <div className={styles.outcomeContainer}>
        <div className={styles.emptyState}>
          <h3>No Proposals to Show</h3>
          <p>There are no proposals for this issue yet. Go to the Proposals tab to create one.</p>
        </div>
      </div>
    );
  }
  
  // If no votes, show empty state
  if (totalVotes === 0) {
    return (
      <div className={styles.outcomeContainer}>
        <div className={styles.emptyState}>
          <h3>No Votes Yet</h3>
          <p>No one has voted on the proposals for this issue. Go to the Vote tab to cast your vote.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.outcomeContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Outcome Results</h2>
        <p className={styles.description}>
          Based on {totalVotes} vote{totalVotes !== 1 ? 's' : ''} from community members.
          Results are updated in real-time as votes are cast.
        </p>
      </div>
      
      {error && <div className={styles.error}>{error}</div>}
      
      <ul className={styles.rankingList}>
        {outcome.map((proposal, index) => {
          const voteData = voteCounts[proposal.id] || { count: 0, percent: 0, ranks: [] };
          
          return (
            <li key={proposal.id} className={styles.rankingItem}>
              <div className={styles.rankBadge}>{index + 1}</div>
              
              <div className={styles.proposalContent}>
                <div className={styles.proposalHeader}>
                  <div className={styles.proposalTitle}>
                    {proposal.text.length > 100
                      ? `${proposal.text.substring(0, 100)}...`
                      : proposal.text}
                  </div>
                  <div className={styles.proposalAuthor}>By: {proposal.author}</div>
                </div>
                
                <div className={styles.voteStats}>
                  <div className={styles.voteCount}>
                    {voteData.count} vote{voteData.count !== 1 ? 's' : ''}
                    ({voteData.percent.toFixed(1)}%)
                  </div>
                  
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill}
                      style={{ width: `${voteData.percent}%` }}
                    ></div>
                  </div>
                  
                  <div className={styles.rankDistribution}>
                    {voteData.ranks.map((count, rankIndex) => (
                      <div 
                        key={rankIndex}
                        className={styles.rankBar}
                        title={`${count} vote${count !== 1 ? 's' : ''} at rank ${rankIndex + 1}`}
                      >
                        <div 
                          className={styles.rankFill}
                          style={{ 
                            height: `${count > 0 ? (count / totalVotes) * 100 : 0}%`,
                            backgroundColor: rankIndex === 0 ? '#4285f4' : 
                                           rankIndex === 1 ? '#5e97f5' : 
                                           rankIndex === 2 ? '#7baaf7' : '#a8c6f8'
                          }}
                        ></div>
                        <div className={styles.rankLabel}>{rankIndex + 1}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      
      <div className={styles.legend}>
        <p>The ranking is determined by a Borda count system, where higher placements in individual votes earn more points.</p>
      </div>
    </div>
  );
};

export default Outcome;
