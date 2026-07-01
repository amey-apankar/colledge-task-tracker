import React, { useState, useContext, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';

export default function TaskForm({ task, onClose }) {
  const { createTask, updateTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Medium');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setStatus(task.status || 'Pending');
      setPriority(task.priority || 'Medium');
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setFormError('Title is required');
      return;
    }
    if (title.length > 100) {
      setFormError('Title cannot exceed 100 characters');
      return;
    }
    if (description.length > 500) {
      setFormError('Description cannot exceed 500 characters');
      return;
    }

    setFormError('');
    const taskData = { title: title.trim(), description: description.trim(), status, priority };

    let res;
    if (task) {
      res = await updateTask(task._id, taskData);
    } else {
      res = await createTask(taskData);
    }

    if (res.success) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {formError && <div className="form-error-banner">{formError}</div>}

          <div className="form-group">
            <label htmlFor="task-title">Title</label>
            <input
              type="text"
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              maxLength={100}
              required
            />
            <span className="char-counter">{title.length}/100</span>
          </div>

          <div className="form-group">
            <label htmlFor="task-desc">Description</label>
            <textarea
              id="task-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details (optional)"
              maxLength={500}
              rows={4}
            />
            <span className="char-counter">{description.length}/500</span>
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="task-status">Status</label>
              <select
                id="task-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="form-group half-width">
              <label htmlFor="task-priority">Priority</label>
              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {task ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
