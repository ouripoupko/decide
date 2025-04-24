import { useState } from "react";
import styles from "./Discussion.module.scss";
import { addComment } from "src/reducers/issueSlice";

type CommentPropsType = {
  comment: any;
  level?: number;
};

const Comment = ({ comment, level = 0 }: CommentPropsType) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const agent = "someone"; //{ agent } = useSelector(state => state.auth);

  const handleSubmitReply = async (e: any) => {
    e.preventDefault();

    if (!replyText.trim()) {
      return;
    }

    const replyComment = {
      id: Date.now().toString(),
      author: agent,
      text: replyText,
      timestamp: Date.now(),
      parentId: comment.id,
      replies: [],
    };

    await addComment(replyComment);
    setReplyText("");
    setShowReplyForm(false);
  };

  return (
    <div className={`${styles.comment} ${level > 0 ? styles.nested : ""}`}>
      <div className={styles.commentHeader}>
        <div className={styles.commentAuthor}>
          {comment.author === agent ? "You" : comment.author}
        </div>
        <div className={styles.commentTimestamp}>
          {new Date(comment.timestamp).toLocaleString()}
        </div>
      </div>

      <div className={styles.commentText}>{comment.text}</div>

      <div className={styles.commentActions}>
        <button
          className={styles.replyButton}
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          {showReplyForm ? "Cancel Reply" : "Reply"}
        </button>
      </div>

      {showReplyForm && (
        <form onSubmit={handleSubmitReply} className={styles.replyForm}>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className={styles.replyInput}
            rows={3}
            required
          />
          <button
            type="submit"
            className={styles.submitButton}
            disabled={!replyText.trim()}
          >
            Submit Reply
          </button>
        </form>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className={styles.replies}>
          {comment.replies.map((reply: any) => (
            <Comment key={reply.id} comment={reply} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

type DiscussionPropsType = {
  issue?: any;
};

const Discussion = ({ issue }: DiscussionPropsType) => {
  const [newComment, setNewComment] = useState("");
  const agent = "someone"//{ agent } = useSelector((state) => state.auth);
  const loading = false//{ loading } = useSelector((state) => state.issue);

  const handleSubmitComment = async (e: any) => {
    e.preventDefault();

    if (!newComment.trim()) {
      return;
    }

    await addComment({
      id: Date.now().toString(),
      author: agent,
      text: newComment,
      timestamp: Date.now(),
      replies: [],
    });

    setNewComment("");
  };

  // Organize comments into a tree structure
  const buildCommentTree = (comments: any) => {
    if (!comments || !Array.isArray(comments)) return [];

    const commentMap: {[key: number]: any} = {};
    const rootComments: any = [];

    // First pass: Create a map of all comments by ID
    comments.forEach((comment) => {
      commentMap[comment.id] = {
        ...comment,
        replies: [],
      };
    });

    // Second pass: Organize into tree structure
    comments.forEach((comment) => {
      if (comment.parentId && commentMap[comment.parentId]) {
        commentMap[comment.parentId].replies.push(commentMap[comment.id]);
      } else {
        rootComments.push(commentMap[comment.id]);
      }
    });

    return rootComments;
  };

  const comments = buildCommentTree(issue?.comments || []);
  const isCreator = agent === issue?.creator;

  return (
    <div className={styles.discussionContainer}>
      <div className={styles.issueDescription}>
        <div className={styles.descriptionHeader}>
          <h3 className={styles.descriptionTitle}>Description</h3>
          {isCreator && <button className={styles.editButton}>Edit</button>}
        </div>

        {issue?.description ? (
          <div className={styles.descriptionText}>{issue.description}</div>
        ) : (
          <div className={styles.emptyDescription}>No description provided</div>
        )}

        <div className={styles.descriptionMeta}>
          Created by {issue?.creator === agent ? "you" : issue?.creator} on{" "}
          {new Date(issue?.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className={styles.commentsSection}>
        <h3 className={styles.commentsTitle}>Comments ({comments.length})</h3>

        <form onSubmit={handleSubmitComment} className={styles.commentForm}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className={styles.commentInput}
            rows={4}
            disabled={loading}
            required
          />
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading || !newComment.trim()}
          >
            {loading ? "Submitting..." : "Submit Comment"}
          </button>
        </form>

        {comments.length === 0 ? (
          <div className={styles.emptyComments}>No comments yet</div>
        ) : (
          <div className={styles.commentsList}>
            {comments.map((comment: any) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Discussion;
