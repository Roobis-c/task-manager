import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [mode, setMode] = useState('dark');
  useEffect(() => {
    document.body.className = mode;
  }, [mode]);

  const addTask = () => {
    if (inputTask.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: inputTask,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInputTask('');
    } else {
      alert('Empty Task');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const toggleMode = () => {
    setMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <button onClick={toggleMode} className="mode-toggle">
        {mode === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      <div id="screen">
        <div id="inputContainer">
          <h1>Todo</h1>
          <input
            id="inputTask"
            type="text"
            placeholder="Enter the Task"
            value={inputTask}
            onChange={(e) => setInputTask(e.target.value)}
          />
          <br />
          <button id="intbtn" onClick={addTask}>ADD</button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <button className="filter-btn" onClick={() => setFilter('all')}>All</button>
          <button className="filter-btn" onClick={() => setFilter('completed')}>Completed</button>
          <button className="filter-btn" onClick={() => setFilter('pending')}>Yet to Complete</button>
        </div>

        <div id="outputContainer">
          {filteredTasks.map(task => (
            <div key={task.id} id="mytask">
              <input
                id="check"
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskStatus(task.id)}
              />
              <label
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? '#aaa' : undefined
                }}
              >
                {task.text}
              </label>
              <button id="del" onClick={() => deleteTask(task.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  className="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
