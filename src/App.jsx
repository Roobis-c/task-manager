import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState('light');
  const [filter, setFilter] = useState('all'); 

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('myTasks'));
    const savedTheme = localStorage.getItem('theme');

    if (storedTasks) setTasks(storedTasks);
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const saveTasks = () => {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    alert('Tasks saved successfully!');
  };

  const addTask = () => {
    if (!taskTitle.trim()) {
      alert('Task title is required!');
      return;
    }
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      description,
      dueDate,
      priority,
      completed: false
    };
    setTasks(prev => [...prev, newTask]);
    setTaskTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Medium');
  };

  const toggleComplete = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div id="screen">
              <button className="mode-toggle" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      <div id="inputContainer">
        <h1>Todo</h1>

        <input
          id="inputTask"
          type="text"
          placeholder="Enter the Task"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <input
          id="inputTask"
          type="text"
          placeholder="Enter the description of the task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label style={{ marginLeft: '50px' }}>Due Date</label>
        <input
          id="inputTask"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <label style={{ marginLeft: '50px' }}>Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button id="intbtn" onClick={addTask}>Add</button>
        <button
          className="mode-toggle"
          style={{ marginTop: '10px', marginLeft: '10px' }}
          onClick={saveTasks}
        >
          Save
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          className="filter-btn"
          onClick={() => setFilter('all')}
          style={{ backgroundColor: filter === 'all' ? '#0077ff' : '' }}
        >
          All
        </button>
        <button
          className="filter-btn"
          onClick={() => setFilter('completed')}
          style={{ backgroundColor: filter === 'completed' ? '#0077ff' : '' }}
        >
          Completed
        </button>
        <button
          className="filter-btn"
          onClick={() => setFilter('incomplete')}
          style={{ backgroundColor: filter === 'incomplete' ? '#0077ff' : '' }}
        >
          Incomplete
        </button>
      </div>

      <div id="outputContainer">
        {filteredTasks.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No tasks to display.</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} id="mytask">
              <input
                id="check"
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <label  className={task.completed ? 'completed-task' : ''}>
                <span><b>Title:</b> {task.title}</span><br />
                <span><b>Description:</b> {task.description}</span><br />
                <span><b>Due:</b> {task.dueDate}</span><br />
                <span><b>Priority:</b> {task.priority}</span>
              </label>
              <button id="del" onClick={() => deleteTask(task.id)}>🗑️</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default  App;
