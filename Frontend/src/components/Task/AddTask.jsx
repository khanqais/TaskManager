import { useState } from 'react';
import { taskAPI } from '../../services/api';

const AddTask = ({ onTaskAdded }) => {
  const [taskName, setTaskName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    setLoading(true);
    try {
      await taskAPI.createTask({ name: taskName.trim() });
      setTaskName('');
      onTaskAdded(); 
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-task">
      <form onSubmit={handleSubmit} className="add-task-form">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter new task (max 20 characters)"
          maxLength="20"
          required
        />
        <button type="submit" disabled={loading || !taskName.trim()}>
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
