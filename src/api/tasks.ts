import axios from 'axios';

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
});

export function fetchTasksAPI() {
  return API.get('/tasks');
}

// Create a task
export function createTaskAPI(payload: {
  title: string;
  description?: string;
  completed?: boolean;
}) {
  return API.post('/tasks', payload);
}

// Update a task
export function updateTaskAPI(id: string, payload: {
  title: string;
  description?: string;
  completed: boolean;
}) {
  return API.put(`/tasks/${id}`, payload);
}

// Delete a task
export function deleteTaskAPI(id: string) {
  return API.delete(`/tasks/${id}`);
}
