import React, { useEffect } from 'react';
import './TaskControls.css';
import { Task, TaskStatus } from '../types/Task';
import { User } from '../types/User';
import Select, {Option} from './Select';
import Input from './Input';

interface TaskControlsProps {
  tasks: Task[];
  users: User[];
  onFilterChange: (filters: { status?: string; tags?: string; user?: string; search?: string }) => void;
  onSortChange: (sortBy: keyof Task) => void;
  // onCreateTask: (newTask: Task) => void; // Prop to handle creating a new task
}

const TaskControls: React.FC<TaskControlsProps> = ({ onFilterChange, onSortChange, users }) => {
  const [status, setStatus] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [user, setUser] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [isCreating, setIsCreating] = React.useState(false);
  const userOptions:Option[] = users.map(user=> {
    return {value: user.id.toString(), label: `${user.firstName} ${user.lastName}`};
  });

  const taskStatusValues = Object.values(TaskStatus);

  const statusOptions:Option[] = taskStatusValues.map(status=> {
    return {value: status, label: status};
  });


  const handleCreateTask = () => {
    setIsCreating(true);
    // Optionally, you can call onCreateTask here to show a modal
  };
  const handleUserChange = (value:any)=>{
    console.log('enter in handle user change======', value);
    setUser(value);
  }

  useEffect(()=>{
    onFilterChange({ status, tags, user, search });
  }, [status, tags, user, search])

  return (
    <div className="task-controls">
      <div className="task-controls-row">
        <div className="filter-group">
          <Select defaultLabel={'Select status'} options={statusOptions} onChange={handleUserChange} />
          <Input
            value={tags}
            onChange={setSearch}
            placeholder="Filter by Tags"
            className="filter-input"
          />
          <Select defaultLabel={'Select user'} options={userOptions} onChange={handleUserChange} />
          <Input
            value={search}
            onChange={setSearch}
            placeholder="Search Task"
            className="filter-input"
          />
        </div>

        {/* Sort Controls */}
        <div className="sort-group">
          <button onClick={() => onSortChange('assignedUser' as keyof Task)} className="sort-button">
            Sort by User
          </button>
          <button onClick={() => onSortChange('status' as keyof Task)} className="sort-button">
            Sort by Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskControls;
