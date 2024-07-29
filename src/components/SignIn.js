import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './SignIn.css';

const SignIn = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api.realworld.io/api/users/login', {
        user: { email, password }
      });
      localStorage.setItem('token', response.data.user.token);
      setIsAuthenticated(true);
      navigate('/settings');
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="container page">
      <div className="row">
        <div className="col-md-6">
          <h1 className="text-xs-center">Sign in</h1>
          <p className="text-xs-center">
            <NavLink to="/signup">Need an account?</NavLink>
          </p>
          <ul className="error-messages">{error && <li>{error}</li>}</ul>
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
