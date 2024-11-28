import React, { useEffect, useState } from 'react';
import './TaskControls.css';
import { Task, TaskStatus } from '../../types/Task';
import { User } from '../../types/User';
import Select, {Option} from '../Select/Select';
import Input from '../Input/Input';

interface TaskControlsProps {
  tasks: Task[];
  users: User[];
  onFilterChange: (filters: { status?: string; tags?: string; user?: string; search?: string }) => void;
  onSortChange: ({sortBy}: {sortBy: keyof Task | null, sortOrder: string}) => void;
  // onCreateTask: (newTask: Task) => void; // Prop to handle creating a new task
}

const TaskControls: React.FC<TaskControlsProps> = ({ onFilterChange, onSortChange, users }) => {
  const [status, setStatus] = useState('');
  const [tags, setTags] = useState('');
  const [user, setUser] = useState('');
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof Task | null>(null);
  const [sortOrder, setSortOrder] = useState('asc');


  const userOptions:Option[] = users.map(user=> {
    return {value: user.id.toString(), label: `${user.firstName} ${user.lastName}`};
  });

  const taskStatusValues = Object.values(TaskStatus);
  const statusOptions:Option[] = taskStatusValues.map(status=> {
    return {value: status, label: status};
  });

  const sortOptions = [
    {label: 'User', value: 'user'},
    {label: 'Status', value: 'status'},
  ]


  const handleUserChange = (value:string)=>{
    setUser(value);
  }
  const handleStatusChange = (value:string)=>{
    setStatus(value);
  }
  const handleTagChange = (value:string)=>{
    setTags(value);
  }
  const handleSortColumnChange = (value: keyof Task)=>{
    setSortColumn(value);
  }
  const handleSortToggle = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  useEffect(()=>{
    onFilterChange({ status, tags, user, search });
  }, [status, tags, user, search])

  useEffect(()=>{
    onSortChange({ sortBy: sortColumn, sortOrder });
  }, [sortColumn, sortOrder])

  return (
<div className="task-controls">
  <div className="task-controls-row">
    <div className="filter-group">
      {/* Status Select */}
      <Select
        id="select-status"
        defaultLabel="Select status"
        options={statusOptions}
        onChange={handleStatusChange}
        aria-label="Filter tasks by status"
      />

      {/* Tags Input */}
      <Input
        value={tags}
        onChange={handleTagChange}
        placeholder="Filter by Tags"
        className="filter-input"
        aria-label="Filter tasks by tags"
      />

      {/* User Select */}
      <Select
        id="select-user"
        defaultLabel="Select user"
        options={userOptions}
        onChange={handleUserChange}
        aria-label="Filter tasks by user"
      />

      {/* Search Input */}
      <Input
        value={search}
        onChange={setSearch}
        placeholder="Search Task"
        className="filter-input"
        aria-label="Search tasks"
      />
    </div>

    {/* Sort Controls */}
    <div className="sort-group">
      {/* Sort By Select */}
      <Select
        id="sort-by"
        defaultLabel="Sort by"
        className="sort-button"
        options={sortOptions}
        onChange={(value) => handleSortColumnChange(value as keyof Task)}
        aria-label="Sort tasks by column"
      />

      {/* Sort Order Button */}
      <button
        onClick={handleSortToggle}
        className="sort-button"
        aria-label={`Toggle sort order to ${
          sortOrder === 'asc' ? 'descending' : 'ascending'
        }`}
      >
        Sort {sortOrder === 'asc' ? 'Desc' : 'Asc'}
      </button>
    </div>
  </div>
</div>
  );
};

export default TaskControls;
