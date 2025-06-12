
import React from 'react';
import { useAppSelector } from '../hooks/redux';

export const TaskStats: React.FC = () => {
  const tasks = useAppSelector(state => state.tasks.tasks);
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="text-center p-4 bg-white/10 dark:bg-black/20 rounded-2xl backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/15 dark:hover:bg-black/30 transition-all duration-300">
        <div className="text-3xl font-bold text-white mb-1">{totalTasks}</div>
        <div className="text-purple-100 dark:text-slate-300 text-sm">Total Tasks</div>
      </div>
      <div className="text-center p-4 bg-white/10 dark:bg-black/20 rounded-2xl backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/15 dark:hover:bg-black/30 transition-all duration-300">
        <div className="text-3xl font-bold text-white mb-1">{completedTasks}</div>
        <div className="text-purple-100 dark:text-slate-300 text-sm">Completed</div>
      </div>
      <div className="text-center p-4 bg-white/10 dark:bg-black/20 rounded-2xl backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/15 dark:hover:bg-black/30 transition-all duration-300">
        <div className="text-3xl font-bold text-white mb-1">{completionRate}%</div>
        <div className="text-purple-100 dark:text-slate-300 text-sm">Progress</div>
      </div>
    </div>
  );
};
