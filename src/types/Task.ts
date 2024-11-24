// src/types/Task.ts
import {User} from './User';

export enum TaskStatus {
    Todo = 'Todo',
    InProgress = 'In Progress',
    Blocked = 'Blocked',
    Hold = 'Hold',
    Completed = 'Completed',
    ReadyForProd = 'Ready for Prod',
  }

  export enum TaskPriority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
    Critical = 'Critical'
  }


export interface Task {
    id: number;
    title: string;
    description: string;
    tags?: string[];
    status: TaskStatus;
    user?: User;
    userProfilePic?: string;
    parentTaskId?: number;
    createdAt: string;
    priority: TaskPriority
}

