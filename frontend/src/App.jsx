import React, { useContext, useState } from 'react';
import { TaskContext, TaskProvider } from './context/TaskContext';
import FilterSort from './components/FilterSort';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import Toast from './components/Toast';

function Dashboard() {
  const { tasks, loading } = useContext(TaskContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="app-container">
      <header>
        <h1>TaskSpace</h1>
        <button className="btn btn-primary" onClick={() => setIsFormOpen(true)}>
          + Add Task
        </button>
      </header>

      <FilterSort />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <h3>No tasks found</h3>
          <p>Create a task to get started or try changing the filters.</p>
        </div>
      ) : (
        <div className="tasks-grid">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onEdit={handleEditTask} />
          ))}
        </div>
      )}

      {isFormOpen && (
        <TaskForm task={editingTask} onClose={handleCloseForm} />
      )}

      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <Dashboard />
    </TaskProvider>
  );
}
