import React, { useEffect } from 'react';
import { Task } from '../../types/Task';
import './TaskCard.css';
import Tag from '../Tags/Tag';

interface TaskCardProps {
  task: Task;
  onClose: () => void;
}


const TaskCard: React.FC<TaskCardProps> = ({ task, onClose }) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose(); // Close the modal when Escape is pressed
      }
    };

    window.addEventListener('keydown', handleEscapeKey);

    return () => {
      window.removeEventListener('keydown', handleEscapeKey); // Cleanup the event listener
    };
  }, [onClose]);
  return (
    <div className="task-card">
      <h3 className="task-title">{task.title}</h3>
      <div className="task-icons">
        <img src={task.user?.profilePic} alt="User Avatar" className="user-avatar" />
        {task.user?.firstName && <label>{task.user?.firstName} </label>}
      </div>
      <div className="task-metadata">
        <div className="task-tags">
          {task.tags?.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default TaskCard;
