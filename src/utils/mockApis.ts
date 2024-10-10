import { Task, TaskStatus } from "../types/Task";
import { User, UserSession } from "../types/User";

const mockUsers: User[] = [
    {id: 1, firstName: 'John', lastName: 'Does', profilePic: 'https://i.pravatar.cc/150?img=3',},
    {id: 2, firstName: 'Alice', lastName: 'Matt', profilePic: 'https://i.pravatar.cc/150?img=2'},
    {id: 3, firstName: 'Kelin', lastName: 'Mark', profilePic: 'https://i.pravatar.cc/150?img=1'}
]

const mockTasks: Task[] = [
    { id: 111, title: 'Task 1', status: TaskStatus.Todo, tags: ['urgent', 'prod'], description: 'Description of Task', user : {id: 1, firstName: 'John', lastName: 'Does', profilePic: 'https://i.pravatar.cc/150?img=3'}, createdAt: '26th June' },
    { id: 2222, title: 'Task 2', status: TaskStatus.InProgress, tags: ['backend'], description: 'Description of Task', user : {id: 2, firstName: 'Alice', lastName: 'Matt', profilePic: 'https://i.pravatar.cc/150?img=2'}, createdAt: '26th June' },
    { id: 3333, title: 'Task 3', status: TaskStatus.Blocked, tags: ['frontend'], description: 'Description of Task', user : {id: 3, firstName: 'Kelin', lastName: 'Mark', profilePic: 'https://i.pravatar.cc/150?img=1'}, createdAt: '26th June' },
    // Add more initial tasks as needed
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

export const mockAuth = (email: string, password: string): Promise<UserSession> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u=> `${u.firstName}@${u.lastName}`.toLowerCase() === email.toLowerCase());
        console.log('user========', user, email, password);
        if (user && password === 'password') {
            console.log('enter in if')
          resolve({...user, email});
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };
