import React from 'react';

const OnlineUsers = ({ users }) => {
  return (
    <div className="online-users" style={styles.container}>
      <h3 style={styles.header}>Online Users in this Room:</h3>
      {users.length > 0 ? (
        <ul style={styles.userList}>
          {users.map((username) => (
            <li key={username} style={styles.userItem}>{username}</li>
          ))}
        </ul>
      ) : (
        <p style={styles.noUsers}>No users currently online in this room.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
  },
  header: {
    color: '#FFD700',
    fontSize: '18px',
    marginBottom: '12px',
  },
  userList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  userItem: {
    color: '#FFFFFF',
    fontSize: '16px',
    marginBottom: '8px',
    padding: '4px 8px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  },
  noUsers: {
    color: '#CCCCCC',
    fontStyle: 'italic',
  },
};

export default OnlineUsers;