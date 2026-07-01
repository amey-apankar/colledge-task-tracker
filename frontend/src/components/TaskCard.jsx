import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';

export default function TaskCard({ task, onEdit }) {
  const { deleteTask, updateTask } = useContext(TaskContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteTask(task._id);
  };

  const handleStatusChange = async (newStatus) => {
    await updateTask(task._id, { status: newStatus });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={`task-card task-card-${task.status.toLowerCase().replace(' ', '-')}`}>
      <div className="task-card-header">
        <span className={`badge badge-priority-${task.priority.toLowerCase()}`}>
          {task.priority} Priority
        </span>
        <span className={`badge badge-status-${task.status.toLowerCase().replace(' ', '-')}`}>
          {task.status}
        </span>
      </div>

      <h3 className="task-card-title">{task.title}</h3>
      
      {task.description && (
        <p className="task-card-description">{task.description}</p>
      )}

      <div className="task-card-meta">
        <span className="task-card-date">Created: {formatDate(task.createdAt)}</span>
      </div>

      <div className="task-card-actions">
        <div className="status-quick-select">
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="status-dropdown"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="action-buttons">
          <button className="btn-icon btn-edit" onClick={() => onEdit(task)} aria-label="Edit task">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button className="btn-icon btn-delete" onClick={handleDelete} disabled={isDeleting} aria-label="Delete task">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
