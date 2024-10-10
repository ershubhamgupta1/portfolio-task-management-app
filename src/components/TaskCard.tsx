import React from 'react';
import { Task } from '../types/Task';
import './TaskCard.css';
import Tag from './Tag';

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
}


const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
    console.log('task========', task);
    return (
      <div className="task-card" onClick={()=>{onClick(task)}}>
        <h3 className="task-title">{task.title}</h3>
        <div className="task-icons">
              <img  src={task.user?.profilePic} alt="User Avatar" className="user-avatar" />
              {task.user?.firstName && <label>{task.user?.firstName} </label>} 
          </div>
        <div className="task-metadata">
          <div className="task-tags">
            {task.tags?.map((tag, index) => (
                <Tag text={tag} />
            //   <span key={index} className="task-tag">
            //     {tag}
            //   </span>
            ))}
          </div>
        </div>
      </div>
    );
  };
export default TaskCard;
