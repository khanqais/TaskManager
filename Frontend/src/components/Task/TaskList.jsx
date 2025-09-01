import { useState, useEffect } from 'react';
import { taskAPI } from '../../services/api';
import TaskItem from './TaskItem';
import AddTask from './AddTask';
import Navbar from '../Navbar';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getAllTasks();
      setTasks(response.data.tasks);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskUpdated = () => {
    fetchTasks();
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="loading">Loading tasks...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="task-manager">
          <h2>My Tasks</h2>
          
          <AddTask onTaskAdded={handleTaskUpdated} />
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="tasks-container">
            {tasks.length === 0 ? (
              <div className="no-tasks">
                <p>No tasks found. Add your first task above!</p>
              </div>
            ) : (
              <div className="tasks-grid">
                {tasks.map((task) => (
                  <TaskItem
                    key={task._id}
                    task={task}
                    onTaskUpdated={handleTaskUpdated}
                    onTaskDeleted={handleTaskUpdated}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="task-summary">
            <p>
              Total: {tasks.length} | 
              Completed: {tasks.filter(t => t.completed).length} | 
              Pending: {tasks.filter(t => !t.completed).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
