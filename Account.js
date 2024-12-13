import React, { useState, useEffect } from 'react';
import Login from './Login'; // Import Login component

const Account = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem('loggedInUser')) || null
  );
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false); // State to control visibility of password update form
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Save logged-in user to localStorage on change
  useEffect(() => {
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  // Handle adding a new account
  const handleAddAccount = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address (e.g., someone@example.com).');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please confirm your password.');
      return;
    }

    const usernameExists = accounts.some((acc) => acc.email === email);
    if (usernameExists) {
      setError('Account with this email already exists.');
      return;
    }

    setAccounts([...accounts, { email, password }]);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  // Handle logging out
  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
    alert('Logged out successfully!');
  };

  // Handle removing an account
  const handleRemoveAccount = (accountEmail) => {
    setAccounts(accounts.filter((account) => account.email !== accountEmail));
  };

  // Handle password update
  const handleUpdatePassword = () => {
    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match. Please confirm your new password.');
      return;
    }

    // Update the password in the accounts list
    setAccounts(
      accounts.map((account) =>
        account.email === loggedInUser.email
          ? { ...account, password: newPassword }
          : account
      )
    );

    // Also update the logged-in user password
    setLoggedInUser({
      ...loggedInUser,
      password: newPassword,
    });

    setIsUpdatingPassword(false);
    setNewPassword('');
    setConfirmNewPassword('');
    setError('');
    alert('Password updated successfully!');
  };

  return (
    <div id="root">
      <div className="account-container">
        <div className="left-side">
          <h2>Manage Your Account</h2>

          {loggedInUser ? (
            <div>
              <h3>Welcome, {loggedInUser.email}!</h3>
              <button className="btn-secondary" onClick={handleLogout}>
                Log Out
              </button>

              {/* Update password form */}
              {isUpdatingPassword && (
                <div className="update-password-section">
                  <h4>Update Password</h4>
                  <div>
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter your new password"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                    <input
                      type="password"
                      id="confirmNewPassword"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Confirm your new password"
                    />
                  </div>
                  {error && <p className="error-message">{error}</p>}
                  <button className="btn-primary" onClick={handleUpdatePassword}>
                    Save New Password
                  </button>
                </div>
              )}
              {!isUpdatingPassword && (
                <button
                  className="btn-secondary"
                  onClick={() => setIsUpdatingPassword(true)} // Show the form when clicked
                >
                  Update Password
                </button>
              )}
            </div>
          ) : (
            <div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
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

              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                />
              </div>

              {error && <p className="error-message">{error}</p>}

              <div className="button-group">
                <button className="btn-primary" onClick={handleAddAccount}>
                  Add Account
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Log In
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="right-side">
          <h3>Existing Accounts</h3>
          {accounts.length === 0 ? (
            <p>No accounts available.</p>
          ) : (
            <ul>
              {accounts.map((account) => (
                <li key={account.email}>
                  <div className="account-info">
                    <strong>Email:</strong> {account.email}
                  </div>
                  <div className="button-group">
                    {/* Update password button */}
                    <button
                      className="btn-secondary"
                      onClick={() => setIsUpdatingPassword(true)} // Show the form when clicked
                    >
                      Update Password
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => handleRemoveAccount(account.email)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isLoginModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <Login
              setError={setError}
              setLoggedInUser={setLoggedInUser}
              accounts={accounts}
            />
            <button
              className="btn-secondary"
              onClick={() => setIsLoginModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;