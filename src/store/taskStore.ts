import create from 'zustand';

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  isImportant: boolean;
  priority: Priority;
  dueDate?: Date;
}

interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (task: Omit<Task, '_id' | 'createdAt'>) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  toggleImportant: (id: string) => void;
  updateTaskPriority: (id: string, priority: Priority) => void;
  fetchTasks: () => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,
  addTask: (task) => {
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...task,
          _id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
        },
      ],
    }));
  },
  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task._id !== id),
    }));
  },
  toggleComplete: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id === id ? { ...task, completed: !task.completed } : task
      ),
    }));
  },
  toggleImportant: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id === id ? { ...task, isImportant: !task.isImportant } : task
      ),
    }));
  },
  updateTaskPriority: (id, priority) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id === id ? { ...task, priority } : task
      ),
    }));
  },
  fetchTasks: () => {
    set({ loading: true });
    // Simulate API call
    setTimeout(() => {
      set({
        tasks: [],
        loading: false,
      });
    }, 1000);
  },
}));