// src/api/taskApi.ts
import { Task } from '../types/Task';

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch('/api/tasks');
  const data = await response.json();
  return data;
};

// Additional API calls for updating, deleting tasks
// src/api/taskApi.ts (Update Task Status)
export const updateTaskStatus = async (taskId: number, newStatus: string): Promise<Task> => {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    const data = await response.json();
    return data;
  };
  