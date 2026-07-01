import React, { createContext, useState, useEffect, useCallback } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt');
  const [toasts, setToasts] = useState([]);

  const API_URL = 'http://localhost:5000/api/tasks';

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = new URL(API_URL);
      if (filterStatus !== 'All') {
        url.searchParams.append('status', filterStatus);
      }
      if (sortBy) {
        url.searchParams.append('sortBy', sortBy);
      }

      const res = await fetch(url.toString());
      if (!res.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [filterStatus, sortBy, addToast]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (taskData) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create task');
      }

      setTasks((prev) => [data, ...prev]);
      addToast('Task created successfully!', 'success');
      return { success: true };
    } catch (err) {
      addToast(err.message, 'error');
      return { success: false, error: err.message };
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update task');
      }

      setTasks((prev) =>
        prev.map((task) => (task._id === id ? data : task))
      );
      addToast('Task updated successfully!', 'success');
      return { success: true };
    } catch (err) {
      addToast(err.message, 'error');
      return { success: false, error: err.message };
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to delete task');
      }

      setTasks((prev) => prev.filter((task) => task._id !== id));
      addToast('Task deleted successfully!', 'success');
      return { success: true };
    } catch (err) {
      addToast(err.message, 'error');
      return { success: false, error: err.message };
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        filterStatus,
        setFilterStatus,
        sortBy,
        setSortBy,
        toasts,
        addToast,
        removeToast,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
