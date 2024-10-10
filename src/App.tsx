// src/App.tsx

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskBoard from './screens/TaskBoard/TaskBoard'; // Your TaskBoard component
import ProfileSettings from './screens/ProfilePage/ProfilePage'; // Your ProfileSettings component
import Login from './screens/Login/Login'; // Your Login component
import { getUserSession } from './utils/auth';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check user session or cookie here to determine if the user is logged in
    const userCookie = getUserSession();
    if (userCookie) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // const handleLogout = () => {
  //   setIsAuthenticated(false);
  //   Cookies.remove('user'); // Clear user session
  // };

  return (
    <div className="app">
      <Router>
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Protected Route: Only accessible if authenticated */}
          <Route
            path="/"
            element={isAuthenticated ? (
              <div>
                <TaskBoard />
              </div>
            ) : (
              <Login onLogin={handleLogin} />
            )}
          />

          {/* Other Routes */}
          <Route path="/profile" element={<ProfileSettings />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
