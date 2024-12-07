import React, { useState } from 'react';

const Account = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');

  const handleAddAccount = () => {
    // Check if the username already exists
    const usernameExists = accounts.some((acc) => acc.username === username);

    if (!username || !password) {
      setError('Username and password cannot be empty.');
      return;
    }

    if (usernameExists) {
      setError('Username already exists. Please choose a different one.');
      return;
    }

    // Add account if username is unique
    setAccounts([...accounts, { username, password }]);
    setUsername('');
    setPassword('');
    setError(''); // Clear error message
  };

  const handleUpdate = () => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) =>
        acc.username === username ? { ...acc, password } : acc
      )
    );
    setError('');
  };

  const handleLogout = () => {
    alert('Logged out successfully!');
  };

  const handleDeleteAccount = (usernameToDelete) => {
    setAccounts(accounts.filter((acc) => acc.username !== usernameToDelete));
    setError('');
  };

  return (
    <div id="root">
      <div className="account-container">
        <div className="left-side">
          <h2>
            <i className="fa fa-user"></i> Manage Your Account
          </h2>
          <p>Update, delete, or log out of your account below.</p>

          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="button-group">
            <button className="btn-primary" onClick={handleAddAccount}>
              Add Account
            </button>
            <button className="btn-warning" onClick={handleUpdate}>
              Update Account
            </button>
            <button className="btn-secondary" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>

        <div className="right-side">
          <h3>Existing Accounts</h3>
          {accounts.length === 0 ? (
            <p>No accounts available.</p>
          ) : (
            <ul>
              {accounts.map((account) => (
                <li key={account.username}>
                  <div className="account-info">
                    <strong>Username:</strong> {account.username}
                  </div>
                  <div className="delete-button-container">
                    <button
                      className="btn-danger"
                      onClick={() => handleDeleteAccount(account.username)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
