import React, { useState } from 'react';
import { useHistory } from '@docusaurus/router';
import styles from './SigninForm.module.css';

interface FormData {
  email: string;
  password: string;
}

interface SigninFormProps {
  onSwitchToSignup?: () => void;
  onSuccess?: () => void;
}

const SigninForm: React.FC<SigninFormProps> = ({ onSwitchToSignup, onSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const API_BASE_URL = process.env.REACT_APP_BETTER_AUTH_API_URL || '/api/auth';
      const response = await fetch(`${API_BASE_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Call onSuccess callback if provided, otherwise redirect
        if (onSuccess) {
          onSuccess();
        } else {
          history.push('/dashboard');
        }
      } else {
        setError(result.error || 'Signin failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Signin error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      {error && <div className={styles.errorMessage}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className={styles.authLinks}>
        <p>
          Don't have an account?{' '}
          {onSwitchToSignup ? (
            <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToSignup(); }}>
              Sign up
            </a>
          ) : (
            <a href="/auth/signup">Sign up</a>
          )}
        </p>
      </div>
    </div>
  );
};

export default SigninForm;