import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserSettings from './components/UserSettings';
import UserPost from './components/UserPost';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/signin" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-light">
          <div className="container">
            <a className="navbar-brand" href="/">conduit</a>
            <ul className="nav navbar-nav pull-xs-right">
              {!isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/" end>Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/signin">Sign in</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/signup">Sign up</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    {/* Update this to the desired route or action */}
                    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/new-articles">New Articles</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/settings">Settings</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/userpost">My Account</NavLink>
                  </li>
                  <li className="nav-item">
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/userpost" : "/signin"} />} />
          <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <UserSettings handleLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userpost"
            element={
              <ProtectedRoute>
                <UserPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-articles"
            element={
              <ProtectedRoute>
                <div>New Articles Page</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
