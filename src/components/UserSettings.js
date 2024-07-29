import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserSettings.css';

const UserSettings = ({ handleLogout }) => {
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('https://api.realworld.io/api/user', {
        headers: { Authorization: `Token ${token}` }
      })
      .then(response => {
        const { image, username, bio } = response.data.user;
        setAvatar(image || '');
        setUsername(username || '');
        setBio(bio || '');
      })
      .catch(err => {
        setError('Error fetching user data');
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put('https://api.realworld.io/api/user', {
        user: { image: avatar, username, bio }
      }, {
        headers: { Authorization: `Token ${token}` }
      });
      setError('Settings updated successfully!');
    } catch (err) {
      setError('Error updating settings');
    }
  };

  return (
    <div className="container page">
      <div className="row">
        <div className="col-md-6">
          <h1 className="text-xs-center">Your Settings</h1>
          <ul className="error-messages">{error && <li>{error}</li>}</ul>
          <form onSubmit={handleSubmit}>
            <fieldset className="form-group">
              <input
                name="avatar"
                className="form-control form-control-lg"
                type="text"
                placeholder="URL of profile picture"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                name="username"
                className="form-control form-control-lg"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </fieldset>
            <fieldset className="form-group">
              <textarea
                name="bio"
                className="form-control form-control-lg"
                rows="8"
                placeholder="Short bio about you"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </fieldset>
            <button type="submit" className="btn btn-lg btn-primary pull-xs-right green-btn">
              Update Settings
            </button>
          </form>
          <button onClick={handleLogout} className="btn btn-lg btn-primary pull-xs-right red-btn">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;