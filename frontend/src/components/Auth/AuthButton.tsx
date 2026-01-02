import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from '@docusaurus/router';

const AuthButton: React.FC = () => {
  const { user, signOut } = useAuth();
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to home page after sign out
      history.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (user) {
    return (
      <div className="auth-user-menu">
        <span className="user-name">Hello, {user.name || user.email}</span>
        <button
          onClick={handleSignOut}
          className="signout-button"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="auth-buttons">
      <a href="/auth/signin" className="signin-button">
        Sign In
      </a>
      <a href="/auth/signup" className="signup-button">
        Sign Up
      </a>
    </div>
  );
};

export default AuthButton;