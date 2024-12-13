import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setLoggedInUser, accounts, setError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate(); // Use navigate to redirect to the homepage

  const handleSubmit = (e) => {
    e.preventDefault();

    // Find the account that matches the email and password
    const user = accounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (user) {
      setLoggedInUser(user); // Set the logged-in user
      setError('');
      setLoginSuccess(true);
      setTimeout(() => {
        // Redirect to homepage after login
        navigate('/home');
      }, 1000); // Redirect delay
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {loginSuccess && (
        <div className="login-success-message">
          <p>Login successfully! Redirecting...</p>
        </div>
      )}
    </div>
  );
};

export default Login;
