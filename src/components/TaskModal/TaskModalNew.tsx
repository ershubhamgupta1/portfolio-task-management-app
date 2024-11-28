import React, { useEffect, useState, useRef } from 'react';
import './TaskModal.css';
import { Task, TaskComment, TaskPriority, TaskStatus } from '../../types/Task';
import Select, { Option } from '../Select/Select';
import { User } from '../../types/User';
import DatePicker from '../DatePicker/DatePicker';
import { useQuery } from "react-query";
import { fetchComments } from '../../utils/mockApis';
import CommentSection from '../TaskComments/TaskComments';

interface TaskModalProps {
  task?: Task; // Optional task for editing
  childTasks?: Task[]; // Array of child tasks
  onClose: () => void;
  onSave: (task: Task) => void;
  onChildClick: (task: Task) => void;
  users: User[];
}

const TaskModal: React.FC<TaskModalProps> = ({ users, task, childTasks = [], onClose, onSave, onChildClick }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || new Date());
  const [description, setDescription] = useState(task?.description || '');
  const [tags, setTags] = useState(task?.tags || []);
  const [status, setStatus] = useState<TaskStatus>(task?.status || TaskStatus.Todo);
  const [priority, setPriority] = useState<TaskPriority>(task?.priority || TaskPriority.Low);
  const [user, setUser] = useState<User | undefined>(task?.user);
  const [comments, setComments] = useState<TaskComment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [customFields, setCustomFields] = useState<Record<string, string>>(task?.customFields || {});
  
  const modalRef = useRef<HTMLDivElement>(null);

  const { data: initialComments, isLoading: isCommentLoading } = useQuery<TaskComment[], Error>(['comments'], fetchComments);

  useEffect(() => {
    if (initialComments) {
      setComments(initialComments);
    }
  }, [initialComments]);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  const handleAddComment = (taskId: number, comment: TaskComment) => {
    setComments((prevComments) => [...prevComments, comment]);
  };

  const handleSave = () => {
    const newTask: Task = {
      id: task ? task.id : Date.now(), 
      title,
      description,
      tags,
      status,
      user,
      priority,
      parentTaskId: task?.parentTaskId,
      createdAt: new Date().toISOString(),
      dueDate: dueDate,
      customFields,
    };
    onSave(newTask);
  };
  const taskPriorityValues = Object.values(TaskPriority);
  const priorityOptions: Option[] = taskPriorityValues.map(priority => ({
    value: priority,
    label: priority,
  }));
  const taskStatusValues = Object.values(TaskStatus);
  const statusOptions: Option[] = taskStatusValues.map(status => ({
    value: status,
    label: status,
  }));

  const handleUserSelect = (userId: string) => {
    const selectedUser = users.find(user => user.id.toString() === userId);
    setUser(selectedUser);
  };

  const handleDateChange = (newDate: Date) => {
    setDueDate(newDate);
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleAddCustomField = () => {
    const newFieldName = prompt('Enter custom field name:');
    if (newFieldName && !customFields[newFieldName]) {
      setCustomFields({ ...customFields, [newFieldName]: '' });
    } else if (newFieldName) {
      alert('Field name must be unique.');
    }
  };

  const handleCustomFieldChange = (fieldName: string, value: string) => {
    setCustomFields({ ...customFields, [fieldName]: value });
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      aria-modal="true"
      tabIndex={-1}
      ref={modalRef}
    >
      <div className="modal flex-container">
        <div className="cross-button-wrapper">
          <button
            className="cross-button"
            onClick={onClose}
            aria-label="Close Modal"
          >
            &times;
          </button>
        </div>
        {/* <h2 id="modal-title">{task ? 'Edit Task' : 'Create Task'}</h2> */}
        <label htmlFor="task-title">Task Title</label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Task Title"
          className="modal-input"
          aria-required="true"
        />
        <label htmlFor="tags">Tags</label>
        <input
          id="tags"
          type="text"
          value={tags.join(', ')}
          onChange={e => setTags(e.target.value.split(', ').map(tag => tag.trim()))}
          placeholder="Tags (comma-separated)"
          className="modal-input flex-item-50"
        />
        <label htmlFor="priority">Priority</label>
        <Select
          id="priority"
          className="modal-select flex-item-50"
          defaultValue={priority}
          defaultLabel="Select priority"
          options={priorityOptions}
          onChange={priority => setPriority(priority as TaskPriority)}
        />
        <label htmlFor="status">Status</label>
        <Select
          id="status"
          className="modal-select flex-item-50"
          defaultValue={status}
          defaultLabel="Select status"
          options={statusOptions}
          onChange={status => setStatus(status as TaskStatus)}
        />
        <label htmlFor="user">Assigned User</label>
        <Select
          id="user"
          className="modal-select flex-item-50"
          defaultLabel="Select user"
          options={users.map(user => ({
            value: user.id.toString(),
            label: `${user.firstName} ${user.lastName}`,
          }))}
          onChange={handleUserSelect}
        />
        <DatePicker
          label="Due Date"
          selectedDate={dueDate}
          onDateChange={handleDateChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
          className="modal-textarea"
        />
        <div className="custom-fields">
            <h3 id="custom-fields-heading">Custom Fields</h3>
            <div className="custom-field-container" role="group" aria-labelledby="custom-fields-heading">
                {Object.keys(customFields).map((fieldName) => (
                <div key={fieldName} className="custom-field">
                    <label htmlFor={`custom-field-${fieldName}`}>{fieldName}</label>
                    <input
                    id={`custom-field-${fieldName}`}
                    type="text"
                    value={customFields[fieldName]}
                    onChange={(e) => handleCustomFieldChange(fieldName, e.target.value)}
                    placeholder={`Enter ${fieldName}`}
                    />
                </div>
                ))}
            </div>
            <button
                onClick={handleAddCustomField}
                className="modal-button add-field-button"
                aria-label="Add a custom field"
            >
                + Add Custom Field
            </button>
        </div>
        {childTasks.length > 0 && (
            <div className="child-tasks flex-item-100" role="region" aria-labelledby="child-tasks-heading">
                <h3 id="child-tasks-heading">Child Tasks</h3>
                <ul>
                {childTasks.map((childTask) => (
                    <li
                    key={childTask.id}
                    className="child-task-item"
                    onClick={() => {
                        onChildClick(childTask);
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`View child task: ${childTask.title}`}
                    >
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
        <a
  href="#"
  className="anchor-button"
  onClick={handleShowComments}
  role="button"
  aria-expanded={showComments}
  aria-controls="comments-section"
>
  {showComments ? 'Hide comments' : 'Show comments'}
</a>
<div className="modal-actions flex-item-100">
  <button
    onClick={handleSave}
    className="modal-button save-button"
    aria-label={task ? 'Update task' : 'Create task'}
  >
    {task ? 'Update' : 'Create'}
  </button>
  <button
    onClick={onClose}
    className="modal-button close-button"
    aria-label="Close modal"
  >
    Close
  </button>
</div>

{task && !isCommentLoading && showComments && (
  <CommentSection
    taskId={task?.id}
    comments={comments || []}
    onAddComment={handleAddComment}
  />
)}
        {/* Additional Features */}
      </div>
    </div>
  );
};

export default TaskModal;
