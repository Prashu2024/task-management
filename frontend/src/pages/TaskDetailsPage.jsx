import React, { useState, useEffect } from 'react';
import { getTaskById, deleteTask } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

const TaskDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTaskDetails();
  }, [id]);

  const fetchTaskDetails = async () => {
    try {
      setLoading(true);
      const response = await getTaskById(id);
      setTask(response.data);
    } catch (err) {
      setError('Failed to fetch task details.');
      console.error('Error fetching task details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        navigate('/tasks'); // Redirect to task list after deletion
      } catch (err) {
        setError('Failed to delete task.');
        console.error('Error deleting task:', err);
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading task details...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (!task) {
    return <div className="text-center mt-8 text-gray-600">Task not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{task.title}</h1>
        <p className="text-gray-700 mb-4">
          <strong>Description:</strong> {task.description}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Status:</strong> {task.status}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Deadline:</strong> {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Assigned To:</strong> {task.assignee ? task.assignee.username : 'Unassigned'}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Created By:</strong> {task.created_by}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Created At:</strong> {new Date(task.created_at).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-6">
          <strong>Last Updated:</strong> {new Date(task.updated_at).toLocaleDateString()}
        </p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => navigate(`/tasks/edit/${task.id}`)}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Delete
          </button>
          <button
            onClick={() => navigate('/tasks')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
