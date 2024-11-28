import { Task, TaskComment, TaskPriority, TaskStatus } from "../types/Task";
import { User, UserSession } from "../types/User";

const mockUsers: User[] = [
    {id: 1, firstName: 'John', lastName: 'Does', profilePic: 'https://i.pravatar.cc/150?img=3',},
    {id: 2, firstName: 'Alice', lastName: 'Matt', profilePic: 'https://i.pravatar.cc/150?img=2'},
    {id: 3, firstName: 'Kelin', lastName: 'Mark', profilePic: 'https://i.pravatar.cc/150?img=1'}
]



const mockTasks: Task[] = [
    { id: 111, title: 'Task 1', status: TaskStatus.Todo, tags: ['urgent', 'prod'], description: 'Description of Task', user : {id: 1, firstName: 'John', lastName: 'Does', profilePic: 'https://i.pravatar.cc/150?img=3'}, createdAt: '26th June', priority: TaskPriority.Low, dueDate: new Date() },
    { id: 2222, title: 'Task 2', status: TaskStatus.InProgress, tags: ['backend'], description: 'Description of Task', user : {id: 2, firstName: 'Alice', lastName: 'Matt', profilePic: 'https://i.pravatar.cc/150?img=2'}, createdAt: '26th June', priority: TaskPriority.Medium, dueDate: new Date() },
    { id: 3333, title: 'Task 3', status: TaskStatus.Blocked, tags: ['frontend'], description: 'Description of Task', user : {id: 3, firstName: 'Kelin', lastName: 'Mark', profilePic: 'https://i.pravatar.cc/150?img=1'}, createdAt: '26th June', priority: TaskPriority.High, dueDate: new Date()},
    { id: 4444, parentTaskId: 111, title: 'Task1- Child Task 1', status: TaskStatus.Blocked, tags: ['frontend'], description: 'Description of Task', user : {id: 3, firstName: 'Kelin', lastName: 'Mark', profilePic: 'https://i.pravatar.cc/150?img=1'}, createdAt: '26th June', priority: TaskPriority.Low, dueDate: new Date() },
    { id: 5555, parentTaskId: 111, title: 'Task1- CHild Task 2', status: TaskStatus.Blocked, tags: ['frontend'], description: 'Description of Task', user : {id: 3, firstName: 'Kelin', lastName: 'Mark', profilePic: 'https://i.pravatar.cc/150?img=1'}, createdAt: '26th June', priority: TaskPriority.Low, dueDate: new Date() },
  ];
  
  const mockComments = [
    { id: 101, taskId: 111, text: 'This task needs to be completed by end of the day.', userId: 1, createdAt: '2024-11-25T10:30:00Z' },
    { id: 102, taskId: 111, text: 'I have started working on this task.', userId: 1, createdAt: '2024-11-25T11:00:00Z' },
    { id: 103, taskId: 111, text: 'There is an issue with the backend API integration.', userId: 1, createdAt: '2024-11-25T12:15:00Z' },
    { id: 104, taskId: 111, text: 'The UI for this task looks great. Good job!', userId: 1, createdAt: '2024-11-25T14:45:00Z' },
    { id: 105, taskId: 111, text: 'I have pushed the changes to the repository. Please review.', userId: 1, createdAt: '2024-11-25T16:00:00Z' }
  ];
  

// Mock fetch functions
export const fetchUsers = (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUsers);
    }, 1000); // Simulate a network delay
  });
};

export const fetchTasks = (): Promise<Task[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTasks);
    }, 1000); // Simulate a network delay
  });
};

export const fetchComments = (): Promise<TaskComment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockComments);
    }, 1000); // Simulate a network delay
  });
};

export const mockAuth = (email: string, password: string): Promise<UserSession> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u=> `${u.firstName}@${u.lastName}`.toLowerCase() === email.toLowerCase());
        if (user && password === 'password') {
          resolve({...user, email});
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };
