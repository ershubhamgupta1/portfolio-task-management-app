import React from 'react';
import './TaskModal.css';
import { Task, TaskStatus } from '../../types/Task';
import Select, { Option } from '../Select/Select';
import { User } from '../../types/User';

interface TaskModalProps {
  task?: Task; // Optional task for editing
  onClose: () => void;
  onSave: (task: Task) => void;
  users: User[]
}

const TaskModal: React.FC<TaskModalProps> = ({ users, task, onClose, onSave }) => {
  const [title, setTitle] = React.useState(task?.title || '');
  const [description, setDescription] = React.useState(task?.description || '');
  const [tags, setTags] = React.useState(task?.tags || []);
  const [status, setStatus] = React.useState<TaskStatus>(task?.status || TaskStatus.Todo);
  const [user, setUser] = React.useState<User | undefined>(task?.user);

  const userOptions:Option[] = users.map(user=> {
    return {value: user.id.toString(), label: `${user.firstName} ${user.lastName}`};
  });

  const handleSave = () => {
    // Create a new task object
    const newTask: Task = {
      id: task ? task.id : Date.now(), // Assign an ID based on current timestamp for new tasks
      title,
      description,
      tags,
      status,
      user: user, // Optional user
      userProfilePic: task?.user?.profilePic || 'https://i.pravatar.cc/150?img=3', // Optional user profile pic
      parentTaskId: task?.parentTaskId, // Optional parent task ID
      createdAt: new Date().toISOString(), // Current date for created tasks
    };
    
    onSave(newTask);
  };
  const taskStatusValues = Object.values(TaskStatus);

  const statusOptions:Option[] = taskStatusValues.map(status=> {
    return {value: status, label: status};
  });
  const handleUserSelect = (userId: string)=>{
    const user = users.find(user=> user.id.toString() === userId);
    setUser(user);
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{task ? 'Edit Task' : 'Create Task'}</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="modal-input"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="modal-textarea"
        ></textarea>
        <input
          type="text"
          value={tags.join(', ')}
          onChange={(e) => setTags(e.target.value.split(', ').map(tag => tag.trim()))}
          placeholder="Tags (comma-separated)"
          className="modal-input"
        />
        <Select className='modal-select' defaultLabel={'Select status'} options={statusOptions} onChange={(status)=>{setStatus(status as TaskStatus)}} />
        <Select className='modal-select' defaultLabel={'Select user'} options={userOptions} onChange={handleUserSelect} />
        <div className="modal-actions">
          <button onClick={handleSave} className="modal-button save-button">
            {task ? 'Update' : 'Create'}
          </button>
          <button onClick={onClose} className="modal-button close-button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
