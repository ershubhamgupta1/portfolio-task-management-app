import React, { useState } from 'react';
import './Login.css'; // Optional: for custom styles
import { mockAuth } from '../utils/mockApis';
import { setUserSession } from '../utils/auth';
import { UserSession } from '../types/User';

interface Login {
    onLogin: ()=> void;
}

const Login: React.FC<Login> = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Mock authentication function

    try {
      const loggedInUser: UserSession = await mockAuth(email, password);
      setUserSession(loggedInUser);
      onLogin();
    } catch (err:unknown) {
        if(err instanceof Error) setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className='login-input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className='login-input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className='login-button' type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
