
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAppDispatch } from '../hooks/redux';
import { addTask } from '../features/tasks/tasksSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTask({
        title: title.trim(),
        description: description.trim() || undefined,
        completed: false,
      }));
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    }
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="flex-1 bg-white/90 dark:bg-slate-900/90 border-white/30 dark:border-slate-600/30 placeholder:text-gray-500 dark:placeholder:text-slate-400 text-gray-900 dark:text-slate-100 focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
          />
          <Button
            type="submit"
            disabled={!title.trim()}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 dark:from-purple-600 dark:to-blue-600 dark:hover:from-purple-700 dark:hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {isExpanded && (
          <div className="animate-fade-in">
            <Textarea
              placeholder="Add a description (optional)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white/90 dark:bg-slate-900/90 border-white/30 dark:border-slate-600/30 placeholder:text-gray-500 dark:placeholder:text-slate-400 text-gray-900 dark:text-slate-100 resize-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
              rows={3}
            />
            <div className="flex gap-2 mt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsExpanded(false);
                  setDescription('');
                }}
                className="bg-white/20 dark:bg-slate-800/20 border-white/30 dark:border-slate-600/30 text-white hover:bg-white/30 dark:hover:bg-slate-700/30 transition-colors"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!title.trim()}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 dark:from-purple-600 dark:to-blue-600 dark:hover:from-purple-700 dark:hover:to-blue-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200"
              >
                Add Task
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};