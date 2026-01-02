import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface PersonalizationContextType {
  mode: string;
  setMode: (mode: string) => void;
  preferences: Record<string, string>;
  updatePreference: (chapterId: string, mode: string) => Promise<void>;
  loading: boolean;
}

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

interface PersonalizationProviderProps {
  children: ReactNode;
}

export const PersonalizationProvider: React.FC<PersonalizationProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [mode, setMode] = useState<string>('default');
  const [preferences, setPreferences] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  // Load user preferences when user changes
  useEffect(() => {
    if (user) {
      loadUserPreferences();
    } else {
      // If user is not logged in, reset to default
      setPreferences({});
      setMode('default');
      setLoading(false);
    }
  }, [user]);

  const loadUserPreferences = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/personalization/preferences');
      if (response.ok) {
        const data = await response.json();
        const prefMap: Record<string, string> = {};

        data.preferences.forEach((pref: any) => {
          prefMap[pref.chapterId] = pref.contentMode;
        });

        setPreferences(prefMap);

        // Set default mode based on user's background if no specific preferences exist
        if (Object.keys(prefMap).length === 0 && user) {
          setMode(user.softwareBackgroundLevel || 'default');
        }
      }
    } catch (error) {
      console.error('Error loading personalization preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePreference = async (chapterId: string, newMode: string) => {
    if (!user) {
      // Update local state for non-logged-in users
      setPreferences(prev => ({
        ...prev,
        [chapterId]: newMode
      }));
      setMode(newMode);
      return;
    }

    try {
      const response = await fetch(`/api/personalization/chapter/${chapterId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentMode: newMode,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPreferences(prev => ({
          ...prev,
          [chapterId]: data.preference.contentMode
        }));
        setMode(data.preference.contentMode);
      }
    } catch (error) {
      console.error('Error updating personalization preference:', error);
      throw error;
    }
  };

  const value = {
    mode,
    setMode,
    preferences,
    updatePreference,
    loading
  };

  return (
    <PersonalizationContext.Provider value={value}>
      {children}
    </PersonalizationContext.Provider>
  );
};

export const usePersonalization = () => {
  const context = useContext(PersonalizationContext);
  if (context === undefined) {
    throw new Error('usePersonalization must be used within a PersonalizationProvider');
  }
  return context;
};