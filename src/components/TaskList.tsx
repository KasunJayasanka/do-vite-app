
import React from 'react';
import { useAppSelector } from '../hooks/redux';
import { TaskItem } from './TaskItem';

export const TaskList: React.FC = () => {
  const { tasks, filter } = useAppSelector(state => state.tasks);

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-white/60 text-lg mb-2">
          {filter === 'completed' ? 'No completed tasks yet' : 
           filter === 'active' ? 'No active tasks' : 'No tasks yet'}
        </div>
        <div className="text-white/40">
          {filter === 'all' ? 'Add your first task above' : `Switch to "All" to see all tasks`}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};
