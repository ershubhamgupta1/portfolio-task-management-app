import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";

import TaskCard from '../../components/TaskCard/TaskCard';
import './TaskBoard.css';
import { Task, TaskStatus } from '../../types/Task';
import { User } from '../../types/User';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskModal from '../../components/TaskModal/TaskModal';
import TaskControls from '../../components/TaskControls/TaskControls';
import { useNavigate } from 'react-router-dom';
import {fetchTasks, fetchUsers} from '../../utils/mockApis';

// const initialTasks: Task[] = [
//   { id: 111, title: 'Task 1', status: TaskStatus.Todo, tags: ['urgent', 'prod'], description: 'Description of Task', user : {id: 1, firstName: 'John', lastName: 'Does', profilePic: 'https://i.pravatar.cc/150?img=3'}, createdAt: '26th June' },
//   { id: 2222, title: 'Task 2', status: TaskStatus.InProgress, tags: ['backend'], description: 'Description of Task', user : {id: 2, firstName: 'Alice', lastName: 'Matt', profilePic: 'https://i.pravatar.cc/150?img=2'}, createdAt: '26th June' },
//   { id: 3333, title: 'Task 3', status: TaskStatus.Blocked, tags: ['frontend'], description: 'Description of Task', user : {id: 3, firstName: 'Kelin', lastName: 'Mark', profilePic: 'https://i.pravatar.cc/150?img=1'}, createdAt: '26th June' },
//   // Add more initial tasks as needed
// ];

// const users: User[] = [
//     {id: 1, firstName: 'John', lastName: 'Does', profilePic: 'https://i.pravatar.cc/150?img=3'},
//     {id: 2, firstName: 'Alice', lastName: 'Matt', profilePic: 'https://i.pravatar.cc/150?img=2'},
//     {id: 3, firstName: 'Kelin', lastName: 'Mark', profilePic: 'https://i.pravatar.cc/150?img=1'}
// ]

const taskStatusValues = Object.values(TaskStatus);

interface ProfileRowProps {
  avatarUrl: string;
  username: string;
  additionalInfo?: string;
}

const ProfileRow: React.FC<ProfileRowProps> = ({ avatarUrl, username, additionalInfo }) => {
  const navigate = useNavigate();

  return (
    <div className="profile-row" onClick={() => { navigate('/profile'); }}>
      <img src={avatarUrl} alt="Profile Avatar" className="profile-avatar" />
      <div className="profile-avatar-wrapper">
        <h3 className="username">{username}</h3>
        {additionalInfo && <p className="additional-info">{additionalInfo}</p>}
      </div>
    </div>
  );
};

const TaskBoard: React.FC = () => {
    
    const {data: initialUsers=[], isLoading: isUserLoading} = useQuery<User[], Error>(['users'], fetchUsers);
    const {data: initialTasks, isLoading: isTasksLoading} = useQuery<Task[], Error>(['tasks'], fetchTasks);

  useEffect(()=>{
    if(initialTasks) {
        setTasks(initialTasks);
        setFilteredTasks(initialTasks);
    }
  }, [initialTasks]);  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [currentChildTasks, setCurrentChildTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);



  const handleFilterChange = (filters: { status?: string; tags?: string; user?: string; search?: string }) => {
    let updatedTasks = tasks;
    // Filter by Status
    if (filters.status) {
      updatedTasks = updatedTasks.filter(task => task.status === filters.status);
    }

    // Filter by Tags
    if (filters.tags) {
      updatedTasks = updatedTasks.filter(task => filters.tags && task.tags?.includes(filters.tags));
    }
    // Filter by User
    if (filters.user) {
      updatedTasks = updatedTasks.filter(task => task.user?.id.toString() === filters.user?.toString());
    }

    // Search by Task Title
    if (filters.search) {
      updatedTasks = updatedTasks.filter(task => filters.search && task.title.toLowerCase().includes(filters.search.toLowerCase()));
    }

    setFilteredTasks(updatedTasks);
  };

  const handleSortChange = ({sortBy, sortOrder}: {sortBy: keyof Task | null, sortOrder: string}) => {
    if(sortBy === 'user'){
      filteredTasks.sort((a, b): number => {
        if (!a.user && !b.user) return 0; // Both `user` are undefined, consider them equal
        if (!a.user) return 1; // If `a.user` is undefined, `b` comes first
        if (!b.user) return -1; // If `b.user` is undefined, `a` comes first

        // Compare firstname first
        const firstNameComparison = a.user.firstName.localeCompare(b.user.firstName);
        if (firstNameComparison !== 0) {
          return sortOrder === 'asc' ? firstNameComparison : -firstNameComparison;
        }
        // If first names are equal, compare user.lastName
        const lastNameComparison = a.user.lastName.localeCompare(b.user.lastName);
        return sortOrder === 'asc' ? lastNameComparison : -lastNameComparison;      
      });
      setFilteredTasks(JSON.parse(JSON.stringify(filteredTasks)));
    }
  };

  const handleEdit = (parentTask: Task) => {
    const childTasks = initialTasks?.filter(task=> task.parentTaskId === parentTask.id);
    console.log('parentTask===========', parentTask);
    setCurrentChildTasks(childTasks || []);
    setCurrentTask(parentTask);
    setIsModalOpen(true);
  };

  const filterTasks = (status: string) => {
    return filteredTasks.filter((task) => task.status === status);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    movedTask.status = result.destination.droppableId; // Update the status of the task
    updatedTasks.splice(result.destination.index, 0, movedTask);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const handleCreateTask = () => {
    setCurrentTask(null); // No current task means we are creating a new task
    setIsModalOpen(true);
  };

  const saveTask = (task: Task) => {
    console.log('saveTask=======', task);
    let updatedTasks;
    if (currentTask) {
      // Editing an existing task
      updatedTasks = tasks.map(t => t.id === task.id ? task : t);
    } else {
      // Creating a new task
      updatedTasks = [...tasks, task];
    }

    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    closeModal();
  };


  return (
    <>
      <div className='task-board-header'>
        <h1 className="board-title">Task Management Board</h1>
        <ProfileRow
          avatarUrl="https://via.placeholder.com/150" 
          username="John Doe"
          additionalInfo="Software Engineer"
        />
      </div>
      {!isUserLoading && <TaskControls onFilterChange={handleFilterChange} onSortChange={handleSortChange} tasks={tasks} users={initialUsers || []} />}
      {
        !isTasksLoading &&
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="task-board">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={handleCreateTask} className="create-task-button">
              <span>+</span>
            </button>
          </div>
          <div className="columns">
            {taskStatusValues.map((status) => (
              <Droppable key={status} droppableId={status}>
                {(provided) => (
                  <div
                    className="column"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h2>{status}</h2>
                    {filterTasks(status).map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard task={task} onClick={() => handleEdit(task)} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </DragDropContext>
      }
      {isModalOpen && (
        <TaskModal
          key={currentTask?.id}
          task={currentTask || undefined} // Pass undefined for creating a new task
          childTasks={currentChildTasks}
          onClose={closeModal}
          onSave={saveTask}
          onChildClick={handleEdit}
          users={initialUsers || []}
        />
      )}
    </>
  );
};

export default React.memo(TaskBoard);
