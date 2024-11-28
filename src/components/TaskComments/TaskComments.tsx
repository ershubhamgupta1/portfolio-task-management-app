import React, { useState } from 'react';
import './TaskComments.css';
import { TaskComment } from '../../types/Task';
import { getUserSession } from '../../utils/auth';
import { useQuery } from 'react-query';
import { User } from '../../types/User';
import { fetchUsers } from '../../utils/mockApis';


interface CommentSectionProps {
  taskId: number;
  comments: TaskComment[];
  onAddComment: (taskId: number, comment: TaskComment) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ taskId, comments, onAddComment }) => {
  const {data: initialUsers=[]} = useQuery<User[], Error>(['users'], fetchUsers);
  const [newComment, setNewComment] = useState<string>('');
  let currentUser: string | User = getUserSession() || '';
  if(typeof currentUser === 'string') currentUser = JSON.parse(currentUser) as User;
  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    const comment: TaskComment = {
      id: Date.now(), // Unique ID based on timestamp
      taskId,
      text: newComment.trim(),
      userId: (currentUser as User)?.id,  
      createdAt: new Date().toISOString(),
    };

    onAddComment(taskId, comment);
    setNewComment('');
  };

  const formatDate = (date: string): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <div className="comment-list">
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet. Be the first to add one!</p>
        ) : (
          comments.map((comment) => {
            const user = initialUsers.find(userObj=> userObj.id === comment.userId);
            return (
                <div key={comment.id} className="comment-item">
                    <p className="comment-text">{comment.text}</p>
                    <div className="comment-meta">
                    <span className="comment-author">{`${user?.firstName} ${user?.lastName}`}</span> •{' '}
                    <span className="comment-date">{formatDate(comment.createdAt)}</span>
                    </div>
                </div>
  
            )
          })
        )}
      </div>
      <div className="add-comment">
        <textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="comment-input"
        />
        <button onClick={handleAddComment} className="comment-button">
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
