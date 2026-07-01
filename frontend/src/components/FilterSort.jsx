import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

export default function FilterSort() {
  const { filterStatus, setFilterStatus, sortBy, setSortBy } = useContext(TaskContext);

  const statuses = ['All', 'Pending', 'In Progress', 'Completed'];

  return (
    <div className="filter-sort-container">
      <div className="filter-section">
        <span className="filter-label">Filter:</span>
        <div className="filter-buttons">
          {statuses.map((status) => (
            <button
              key={status}
              className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="sort-section">
        <label htmlFor="sort-select" className="sort-label">
          Sort by:
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-dropdown"
        >
          <option value="createdAt">Date Created</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  );
}
