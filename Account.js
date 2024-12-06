import React, { useState } from 'react';


const Account = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accounts, setAccounts] = useState([]);

  const handleAddAccount = () => {
    if (username && password) {
      setAccounts([...accounts, { username, password }]);
      setUsername('');
      setPassword('');
    }
  };

  const handleUpdate = () => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) =>
        acc.username === username ? { ...acc, password } : acc
      )
    );
  };

  const handleLogout = () => {
    alert('Logged out successfully!');
  };

  const handleDeleteAccount = (usernameToDelete) => {
    setAccounts(accounts.filter((acc) => acc.username !== usernameToDelete));
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
