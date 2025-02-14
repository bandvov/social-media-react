import React, { useEffect, useState } from 'react';

const SSENotification = () => {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    // Initialize EventSource to listen for SSE from the server
    const eventSource = new EventSource('http://localhost:8081/notifications/events?user_id=1'); // Replace with your SSE endpoint
    
    // Handle incoming messages
    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event); // Assuming the data is JSON
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        newNotification,
      ]);
    };

    // Handle errors (if needed)
    eventSource.onerror = (error) => {
      console.error('SSE error:', JSON.stringify(error, null, 2));
    };

    // Clean up when the component is unmounted
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li> // Assuming 'message' is a field in the notification
        ))}
      </ul>
    </div>
  );
};

export default SSENotification;
