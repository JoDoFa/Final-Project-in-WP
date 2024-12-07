import React, { useState } from 'react';

function Account() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accounts, setAccounts] = useState([]); // Store list of accounts

  const handleAddAccount = () => {
    if (!username || !password) {
      alert('Please fill in both username and password to add a new account.');
      return;
    }

    // Check for duplicate usernames
    if (accounts.some((account) => account.username === username)) {
      alert('This username is already taken. Please choose a different one.');
      return;
    }

    // Add new account
    const newAccount = { username, password };
    setAccounts([...accounts, newAccount]);
    alert(`Account created successfully! Username: ${username}`);
    setUsername('');
    setPassword('');
  };

  const handleDeleteAccount = (accountUsername) => {
    const updatedAccounts = accounts.filter(
      (account) => account.username !== accountUsername
    );
    setAccounts(updatedAccounts);
    alert(`Account with username "${accountUsername}" has been deleted.`);
  };

  const handleUpdate = () => {
    if (!username || !password) {
      alert('Please fill in both username and password to update the account.');
      return;
    }

    // Check if account exists
    const accountIndex = accounts.findIndex(
      (account) => account.username === username
    );

    if (accountIndex === -1) {
      alert('No account found with this username.');
      return;
    }

    // Update account
    const updatedAccounts = [...accounts];
    updatedAccounts[accountIndex] = { username, password };
    setAccounts(updatedAccounts);
    alert('Account updated successfully!');
  };

  const handleLogout = () => {
    console.log('Logged out');
    alert('You have been logged out.');
    setUsername('');
    setPassword('');
  };

  return (
    <div className="account-container">
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

      {/* Account List Section */}
      <div className="account-list">
        <h3>Existing Accounts</h3>
        {accounts.length === 0 ? (
          <p>No accounts available.</p>
        ) : (
          <ul>
            {accounts.map((account) => (
              <li key={account.username}>
                <div className="account-info">
                  <span>
                    <strong>Username:</strong> {account.username}
                  </span>
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
  );
}

export default Account;
  