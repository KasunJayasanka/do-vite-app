import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchTasksAPI,
  createTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
} from '../../api/tasks';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

export interface TasksState {
  tasks: Task[];
  filter: 'all' | 'active' | 'completed';
  status: 'idle' | 'loading' | 'failed';
}

const initialState: TasksState = {
  tasks: [],
  filter: 'all',
  status: 'idle',
};

// Thunks
export const fetchTasks = createAsyncThunk('tasks/fetch', async () => {
  const resp = await fetchTasksAPI();
  return resp.data.map(t => ({
    ...t,
    createdAt: new Date(t.createdAt).toISOString(),
  }));
});

export const addTask = createAsyncThunk(
  'tasks/add',
  async (payload: Omit<Task, 'id' | 'createdAt'>) => {
    const resp = await createTaskAPI(payload);
    return {
      ...resp.data,
      createdAt: new Date(resp.data.createdAt).toISOString(),
    };
  }
);

export const toggleTask = createAsyncThunk(
  'tasks/toggle',
  async (id: string, thunkAPI) => {
    const state = thunkAPI.getState() as { tasks: TasksState };
    const task = state.tasks.tasks.find(t => t.id === id)!;
    const resp = await updateTaskAPI(id, {
      title: task.title,
      description: task.description,
      completed: !task.completed,
    });
    return { id, completed: resp.data.completed };
  }
);

export const updateTask = createAsyncThunk(
  'tasks/update',
  async (payload: { id: string; title: string; description?: string }) => {
    const resp = await updateTaskAPI(payload.id, {
      title: payload.title,
      description: payload.description,
      completed: true, // or carry through existing
    });
    return {
      id: resp.data.id,
      title: resp.data.title,
      description: resp.data.description,
    };
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (id: string) => {
    await deleteTaskAPI(id);
    return id;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<TasksState['filter']>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // FETCH
      .addCase(fetchTasks.pending, state => { state.status = 'loading'; })
      .addCase(fetchTasks.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.tasks = payload;
      })
      .addCase(fetchTasks.rejected, state => { state.status = 'failed'; })

      // ADD
      .addCase(addTask.fulfilled, (state, { payload }) => {
        state.tasks.unshift(payload);
      })

      // TOGGLE
      .addCase(toggleTask.fulfilled, (state, { payload }) => {
        const t = state.tasks.find(t => t.id === payload.id);
        if (t) t.completed = payload.completed;
      })

      // UPDATE
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        const t = state.tasks.find(t => t.id === payload.id);
        if (t) {
          t.title = payload.title;
          t.description = payload.description;
        }
      })

      // DELETE
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.tasks = state.tasks.filter(t => t.id !== payload);
      });
  },
});

export const { setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;
