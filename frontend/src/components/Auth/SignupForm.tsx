import React, { useState } from 'react';
import { useHistory } from '@docusaurus/router';
import styles from './SignupForm.module.css';

interface FormData {
  email: string;
  password: string;
  name: string;
  softwareBackgroundLevel: string;
  hardwareBackgroundLevel: string;
}

interface SignupFormProps {
  onSwitchToSignin?: () => void;
  onSuccess?: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToSignin, onSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    softwareBackgroundLevel: 'beginner',
    hardwareBackgroundLevel: 'beginner',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      const response = await fetch(`${API_BASE_URL}/signup`, {
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
        setError(result.error || 'Signup failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      {error && <div className={styles.errorMessage}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

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
            placeholder="Minimum 8 characters"
            required
            minLength={8}
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="softwareBackgroundLevel">Software Background</label>
            <select
              id="softwareBackgroundLevel"
              name="softwareBackgroundLevel"
              value={formData.softwareBackgroundLevel}
              onChange={handleChange}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="hardwareBackgroundLevel">Hardware Background</label>
            <select
              id="hardwareBackgroundLevel"
              name="hardwareBackgroundLevel"
              value={formData.hardwareBackgroundLevel}
              onChange={handleChange}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <div className={styles.authLinks}>
        <p>
          Already have an account?{' '}
          {onSwitchToSignin ? (
            <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToSignin(); }}>
              Sign in
            </a>
          ) : (
            <a href="/auth/signin">Sign in</a>
          )}
        </p>
      </div>
    </div>
  );
};

export default SignupForm;