import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const Analysis = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  
  const handleUpdateResume = (userId) => {
    const [editedResume, setEditedResume] = useState('');

    axios.put(`/api/users/${userId}/resume`, { resume: editedResume })
      .then((response) => {
        console.log(`Resume updated for user with ID ${userId}`);
      })
      .catch((error) => {
        console.error('Error updating resume:', error);
      });
  };

  const handleDeleteResume = (userId) => {
    const confirmed = window.confirm('Are you sure you want to delete this resume?');
  
    if (confirmed) {
      axios.delete(`/api/users/${userId}/resume`)
        .then((response) => {
          console.log(`Resume deleted for user with ID ${userId}`);
        })
        .catch((error) => {
          console.error('Error deleting resume:', error);
        });
    }
  };
  

  return (
    <div>
      <h1>Analysis</h1>
      {users.map((user) => (
        <div key={user.id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => handleUpdateResume(user.id)}>Update Resume</button>
          <button onClick={() => handleDeleteResume(user.id)}>Delete Resume</button>
        </div>
      ))}
    </div>
  );
};

export default Analysis;
