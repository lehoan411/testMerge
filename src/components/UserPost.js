import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './UserSettings.css';

const UserPost = () => {
  const [view, setView] = useState('my-articles');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://api.realworld.io/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
          localStorage.setItem('username', data.user.username);
        }
      })
      .catch(error => console.error('Error fetching user data:', error));
    }
  }, []);

  const handleViewChange = (view) => {
    setView(view);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/signin');
  };

  return (
    <div>
      <div className="container page">
        <div className="row">
          <div className="col-md-12">
            {user ? (
              <div className="user-info-box">
                <img src={user.image || 'https://api.realworld.io/images/smiley-cyrus.jpeg'} alt="User Avatar" className="user-avatar" />
                <h4 className="user-name">{user.username}</h4>
                <button className="btn btn-primary" onClick={() => navigate('/settings')}>Go to Settings</button>
              </div>
            ) : (
              <div>Loading user data...</div>
            )}
            <div className="article-buttons">
              <button className={`btn ${view === 'my-articles' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => handleViewChange('my-articles')}>My Articles</button>
              <button className={`btn ${view === 'favourited-articles' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => handleViewChange('favourited-articles')}>My Favourite Articles</button>
            </div>
            <div className="articles">
              {view === 'my-articles' ? (
                <div>Displaying user's articles...</div>
              ) : (
                <div>Displaying favourited articles...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPost;