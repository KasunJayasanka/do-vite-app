
import React, { useState } from 'react';
import { Trash2, Edit } from 'lucide-react';
import { useAppDispatch } from '../hooks/redux';
import { toggleTask, deleteTask, updateTask } from '../features/tasks/tasksSlice';
import type { Task } from '../features/tasks/tasksSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const handleToggle = () => {
    dispatch(toggleTask(task.id));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      dispatch(updateTask({
        id: task.id,
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      }));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(false);
  };

  return (
    <div className={`group relative bg-gradient-to-r from-white/95 to-white/90 dark:from-slate-800/95 dark:to-slate-700/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/30 dark:border-slate-600/30 hover:border-white/50 dark:hover:border-slate-500/50 hover:scale-[1.02] ${
      task.completed ? 'opacity-75 dark:opacity-60' : ''
    }`}>
      {/* Subtle gradient overlay for completed tasks */}
      {task.completed && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-400/20 dark:to-emerald-400/20 rounded-2xl" />
      )}
      
      <div className="relative flex items-start gap-4">
        <Checkbox
          checked={task.completed}
          onCheckedChange={handleToggle}
          className="mt-1 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 dark:data-[state=checked]:bg-green-400 dark:data-[state=checked]:border-green-400 transition-all duration-200"
        />
        
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="bg-white/80 dark:bg-slate-900/80 border-gray-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
                autoFocus
              />
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description (optional)..."
                className="bg-white/80 dark:bg-slate-900/80 border-gray-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 resize-none transition-colors"
                rows={2}
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  disabled={!editTitle.trim()}
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Save
                </Button>
                <Button
                  onClick={handleCancel}
                  size="sm"
                  variant="outline"
                  className="border-gray-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className={`text-lg font-semibold text-gray-900 dark:text-slate-100 mb-1 transition-all duration-200 ${
                task.completed ? 'line-through text-gray-500 dark:text-slate-400' : ''
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-gray-600 dark:text-slate-300 text-sm leading-relaxed ${
                  task.completed ? 'line-through text-gray-400 dark:text-slate-500' : ''
                }`}>
                  {task.description}
                </p>
              )}
              <div className="text-xs text-gray-400 dark:text-slate-500 mt-3 flex items-center gap-1">
                <span className="w-1 h-1 bg-current rounded-full opacity-50"></span>
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>
        
        {!isEditing && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              onClick={handleEdit}
              size="sm"
              variant="ghost"
              className="text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-200"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleDelete}
              size="sm"
              variant="ghost"
              className="text-gray-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
