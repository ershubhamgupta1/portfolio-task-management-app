// src/components/TaskColumn.tsx
import React from 'react';
import TaskModal from './TaskModal';
import { Task } from '../types/Task';

interface TaskColumnProps {
  status: Task['status'];
  tasks: Task[];
  onTaskMove: (taskId: number, newStatus: Task['status']) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ status, tasks, onTaskMove }) => {
  return (
    <div className="col">
      <h4>{status}</h4>
      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="task-box"
            draggable
            onDragStart={() => onTaskMove(task.id, status)}
          >
            {/* <TaskModal task={task} /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
