import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface PersonalizationButtonProps {
  chapterId: string;
  onModeChange?: (mode: string) => void;
}

const PersonalizationButton: React.FC<PersonalizationButtonProps> = ({ chapterId, onModeChange }) => {
  const { user } = useAuth();
  const [currentMode, setCurrentMode] = useState<'beginner' | 'advanced' | 'default'>('default');
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPersonalizationPreference();
    }
  }, [user, chapterId]);

  const fetchPersonalizationPreference = async () => {
    try {
      const response = await fetch(`/api/personalization/chapter/${chapterId}`);
      if (response.ok) {
        const data = await response.json();
        setCurrentMode(data.userContentMode || 'default');
      }
    } catch (error) {
      console.error('Error fetching personalization preference:', error);
    }
  };

  const updatePersonalizationPreference = async (mode: 'beginner' | 'advanced' | 'default') => {
    if (!user) {
      // If user is not logged in, just update local state
      setCurrentMode(mode);
      onModeChange?.(mode);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/personalization/chapter/${chapterId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentMode: mode,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentMode(data.preference.contentMode);
        onModeChange?.(data.preference.contentMode);
      }
    } catch (error) {
      console.error('Error updating personalization preference:', error);
    } finally {
      setLoading(false);
      setShowMenu(false);
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleModeSelect = (mode: 'beginner' | 'advanced' | 'default') => {
    updatePersonalizationPreference(mode);
  };

  if (!user) {
    return (
      <div className="personalization-guest-notice">
        <p>Log in to personalize content to your skill level</p>
        <a href="/auth/signin">Sign In</a> or <a href="/auth/signup">Sign Up</a>
      </div>
    );
  }

  return (
    <div className="personalization-button-container">
      <button
        className="personalization-button"
        onClick={toggleMenu}
        disabled={loading}
      >
        {loading ? 'Updating...' : `Content: ${currentMode.charAt(0).toUpperCase() + currentMode.slice(1)}`}
      </button>

      {showMenu && (
        <div className="personalization-menu">
          <button
            onClick={() => handleModeSelect('beginner')}
            className={currentMode === 'beginner' ? 'active' : ''}
          >
            Beginner Mode
          </button>
          <button
            onClick={() => handleModeSelect('default')}
            className={currentMode === 'default' ? 'active' : ''}
          >
            Default Mode
          </button>
          <button
            onClick={() => handleModeSelect('advanced')}
            className={currentMode === 'advanced' ? 'active' : ''}
          >
            Advanced Mode
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalizationButton;