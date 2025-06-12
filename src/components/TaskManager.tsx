
import React from 'react';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import { FilterTabs } from './FilterTabs';
import { TaskStats } from './TaskStats';
import { DarkModeToggle } from './DarkModeToggle';

export const TaskManager: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 transition-all duration-500">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-start mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
              Task Manager
            </h1>
            <p className="text-purple-100 dark:text-slate-300 text-lg">
              Stay organized and productive with your personal task manager
            </p>
          </div>
          <div className="ml-4">
            <DarkModeToggle />
          </div>
        </div>
        
        <div className="bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl p-6 md:p-8 mb-6 transition-all duration-300">
          <TaskStats />
          <FilterTabs />
          <TaskForm />
        </div>
        
        <TaskList />
      </div>
    </div>
  );
};
