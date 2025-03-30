import React from 'react';

const Head = ({ title, onDelete, onToggle, isCompleted }) => {
  return (
    <div className={`task ${isCompleted ? 'completed' : ''}`}>
      <input type="checkbox" checked={isCompleted} onChange={onToggle} />
      <label>{title}</label>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Head;
