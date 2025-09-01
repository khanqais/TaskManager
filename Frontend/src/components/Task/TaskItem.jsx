import { useState } from 'react';
import { taskAPI } from '../../services/api';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [loading, setLoading] = useState(false);

  const toggleComplete = async () => {
    setLoading(true);
    try {
      await taskAPI.updateTask(task._id, {
        completed: !task.completed,
      });
      onTaskUpdated();
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setLoading(true);
    try {
      await taskAPI.deleteTask(task._id);
      onTaskDeleted();
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <span className="task-name">{task.name}</span>
        <span className="task-status">
          {task.completed ? '✅ Completed' : '⏳ Pending'}
        </span>
      </div>
      
      <div className="task-actions">
        <button
          onClick={toggleComplete}
          disabled={loading}
          className="btn-toggle"
        >
          {task.completed ? 'Mark Pending' : 'Mark Complete'}
        </button>
        
        <button
          onClick={deleteTask}
          disabled={loading}
          className="btn-delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
