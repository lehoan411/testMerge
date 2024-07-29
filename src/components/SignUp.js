import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api.realworld.io/api/users', {
        user: { username, email, password }
      });
      localStorage.setItem('token', response.data.user.token);
      navigate('/signin');
    } catch (err) {
      setError('Error creating account or account already exists.');
    }
  };

  return (
    <div className="container page">
      <div className="row">
        <div className="col-md-6">
          <h1 className="text-xs-center">Sign up</h1>
          <p className="text-xs-center">
            <NavLink to="/signin">Have an account?</NavLink>
          </p>
          <ul className="error-messages">{error && <li>{error}</li>}</ul>
          <form onSubmit={handleSubmit}>
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
              <input
                name="email"
                className="form-control form-control-lg"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                name="password"
                className="form-control form-control-lg"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <button type="submit" className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
