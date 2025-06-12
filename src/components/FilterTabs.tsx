
import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setFilter } from '../features/tasks/tasksSlice';

export const FilterTabs: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector(state => state.tasks.filter);
  const tasks = useAppSelector(state => state.tasks.tasks);

  const filters = [
    { key: 'all' as const, label: 'All', count: tasks.length },
    { key: 'active' as const, label: 'Active', count: tasks.filter(t => !t.completed).length },
    { key: 'completed' as const, label: 'Completed', count: tasks.filter(t => t.completed).length },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map(filter => (
        <button
          key={filter.key}
          onClick={() => dispatch(setFilter(filter.key))}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            currentFilter === filter.key
              ? 'bg-white text-purple-600 shadow-lg scale-105'
              : 'bg-white/20 text-white hover:bg-white/30 hover:scale-105'
          }`}
        >
          {filter.label} ({filter.count})
        </button>
      ))}
    </div>
  );
};