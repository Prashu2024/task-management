import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../api'; // Assuming you have an endpoint to get current user's ID or details

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // In a real application, you'd likely fetch the current user's ID from the token
    // or have a dedicated endpoint like /user/me. For now, we'll simulate.
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        // This is a placeholder. You'd need a way to get the current user's ID.
        // For example, if your token contains user ID, you'd decode it.
        // Or, if you have a /user/me endpoint, you'd call that.
        // For demonstration, let's assume user ID 1 for now.
        const userId = 1; // Placeholder: Replace with actual current user ID
        const response = await getUserById(userId);
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user profile.');
        console.error('Error fetching user profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="text-center mt-8 text-gray-600">User profile not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        <p className="text-gray-700 mb-4">
          <strong>Username:</strong> {user.username}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Role:</strong> {user.role || 'User'}
        </p>
        {/* Add more profile details or update options here */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
