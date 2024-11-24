import React from 'react';
import './TaskModal.css';
import { Task, TaskPriority, TaskStatus } from '../../types/Task';
import Select, { Option } from '../Select/Select';
import { User } from '../../types/User';

interface TaskModalProps {
  task?: Task; // Optional task for editing
  childTasks?: Task[]; // Array of child tasks
  onClose: () => void;
  onSave: (task: Task) => void;
  onChildClick: (task: Task) => void;
  users: User[];
}

const TaskModal: React.FC<TaskModalProps> = ({ users, task, childTasks = [], onClose, onSave, onChildClick }) => {
  console.log('enter in task modal------', task)
  const [title, setTitle] = React.useState(task?.title || '');
  const [description, setDescription] = React.useState(task?.description || '');
  const [tags, setTags] = React.useState(task?.tags || []);
  const [status, setStatus] = React.useState<TaskStatus>(task?.status || TaskStatus.Todo);
  const [priority, setPriority] = React.useState<TaskPriority>(task?.priority || TaskPriority.Low);

  const [user, setUser] = React.useState<User | undefined>(task?.user);

  const userOptions: Option[] = users.map(user => ({
    value: user.id.toString(),
    label: `${user.firstName} ${user.lastName}`,
  }));

  const handleSave = () => {
    const newTask: Task = {
      id: task ? task.id : Date.now(), // Assign an ID based on current timestamp for new tasks
      title,
      description,
      tags,
      status,
      user,
      priority,
      parentTaskId: task?.parentTaskId, // Optional parent task ID
      createdAt: new Date().toISOString(),
    };

    onSave(newTask);
  };

  const taskStatusValues = Object.values(TaskStatus);
  const statusOptions: Option[] = taskStatusValues.map(status => ({
    value: status,
    label: status,
  }));

  const taskPriorityValues = Object.values(TaskPriority);
  const priorityOptions: Option[] = taskPriorityValues.map(priority => ({
    value: priority,
    label: priority,
  }));

  const handleUserSelect = (userId: string) => {
    const selectedUser = users.find(user => user.id.toString() === userId);
    setUser(selectedUser);
  };

  return (
    <div className="modal-overlay">
      <div className="modal flex-container">
        {/* <h2>{task ? 'Edit Task' : 'Create Task'}</h2> */}
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Task Title"
          className="modal-input"
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
          className="modal-textarea"
        ></textarea>
        <input
          type="text"
          value={tags.join(', ')}
          onChange={e => setTags(e.target.value.split(', ').map(tag => tag.trim()))}
          placeholder="Tags (comma-separated)"
          className="modal-input flex-item-50"
        />
        <Select
          className="modal-select flex-item-50"
          defaultValue={priority}
          defaultLabel="Select priority"
          options={priorityOptions}
          onChange={priority => setPriority(priority as TaskPriority)}
        />
        <Select
          className="modal-select flex-item-50"
          defaultValue={status}
          defaultLabel="Select status"
          options={statusOptions}
          onChange={status => setStatus(status as TaskStatus)}
        />
        <Select
          className="modal-select flex-item-50"
          defaultLabel="Select user"
          options={userOptions}
          onChange={handleUserSelect}
        />
        <div className="modal-actions flex-item-100">
          <button onClick={handleSave} className="modal-button save-button">
            {task ? 'Update' : 'Create'}
          </button>
          <button onClick={onClose} className="modal-button close-button">
            Close
          </button>
        </div>
        {/* Display child tasks */}
        {childTasks.length > 0 && (
          <div className="child-tasks flex-item-100">
            <h3>Child Tasks</h3>
            <ul>
              {childTasks.map(childTask => (
                <li key={childTask.id} className="child-task-item" onClick={()=>{onChildClick(childTask)}} >
                  <div className="child-task-title">
                    <strong>{childTask.title}</strong>
                    <span> - {childTask.status}</span>
                  </div>
                  <p>{childTask.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskModal;
