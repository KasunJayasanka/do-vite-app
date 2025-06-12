# Task Manager App

A beautiful, responsive task management application built with React, Redux Toolkit, and Tailwind CSS.

## Features

- ✅ **Add Tasks**: Create new tasks with title and optional description
- ✏️ **Edit Tasks**: Update task details inline
- ✅ **Complete Tasks**: Mark tasks as done/undone with satisfying animations
- 🗑️ **Delete Tasks**: Remove tasks you no longer need
- 🔍 **Filter Tasks**: View All, Active, or Completed tasks
- 📊 **Progress Stats**: Track your productivity with visual statistics
- 📱 **Mobile Responsive**: Perfect experience on all devices
- 🎨 **Beautiful UI**: Modern glassmorphism design with smooth animations

## Tech Stack

- **React 18** - Modern React with hooks
- **Redux Toolkit** - Efficient Redux logic
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool
- **Lucide React** - Beautiful icons

## Quick Start

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd task-manager

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Project Structure

```
src/
├── app/
│   └── store.ts           # Redux store configuration
├── components/
│   ├── TaskManager.tsx    # Main app component
│   ├── TaskForm.tsx       # Add/edit task form
│   ├── TaskList.tsx       # Task list container
│   ├── TaskItem.tsx       # Individual task component
│   ├── FilterTabs.tsx     # Filter navigation
│   └── TaskStats.tsx      # Progress statistics
├── features/
│   └── tasks/
│       └── tasksSlice.ts  # Redux slice for tasks
├── hooks/
│   └── redux.ts           # Typed Redux hooks
└── pages/
    └── Index.tsx          # Main page
```

## Redux State Management

The app uses Redux Toolkit for state management with the following structure:

### Task Interface
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}
```

### Available Actions
- `addTask` - Add a new task
- `toggleTask` - Toggle task completion
- `deleteTask` - Remove a task
- `updateTask` - Edit task details
- `setFilter` - Change active filter

## Responsive Design

The app is built mobile-first with responsive breakpoints:

- **Mobile**: < 768px - Single column layout
- **Tablet**: 768px+ - Optimized spacing and grid
- **Desktop**: 1024px+ - Full featured layout

## Features in Detail

### Task Management
- Create tasks with title and optional description
- Edit tasks inline without losing context
- Mark tasks complete with visual feedback
- Delete tasks with confirmation

### Filtering & Stats
- Filter by All, Active, or Completed tasks
- Real-time statistics showing progress
- Visual completion percentage

### User Experience
- Smooth animations and transitions
- Intuitive touch-friendly interface
- Accessible keyboard navigation
- Loading states and error handling

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).