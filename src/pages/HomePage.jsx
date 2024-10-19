import { Link } from 'react-router-dom';
import React from 'react';
import { useAuthStore } from '../store/authStore';

const HomePage = () => {
  const { user, logout } = useAuthStore();

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const glassmorphicCardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(40px)',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    width: '100%',
    maxWidth: '400px',
    transition: 'transform 0.3s ease',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    fontSize: '18px',
    color: 'white',
    marginBottom: '40px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  };

  const linkButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#ff6666',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const logoutButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#ff6666',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <div style={containerStyle}>
      <div style={glassmorphicCardStyle}>
        <h2 style={titleStyle}>Welcome, {user.name}!</h2>
        <p style={paragraphStyle}>This is your home page.</p>
        <div style={buttonContainerStyle}>
          <Link
            to="/rooms"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <button style={linkButtonStyle}>Go to Chat Rooms</button>
          </Link>
          <button
            style={logoutButtonStyle}
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
