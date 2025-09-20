import React, { useState, useEffect } from 'react';

const NotificationToast = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        onClose();
      }
    }, 3000); // Hide after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between`}
      role="alert"
    >
      <span>{message}</span>
      <button onClick={() => setIsVisible(false)} className="ml-4 text-lg font-bold">
        &times;
      </button>
    </div>
  );
};

export default NotificationToast;
