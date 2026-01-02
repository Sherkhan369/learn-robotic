import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface ContentAdapterProps {
  chapterId: string;
  children: React.ReactNode;
  beginnerContent?: React.ReactNode;
  advancedContent?: React.ReactNode;
  defaultContent?: React.ReactNode;
}

interface ContentVariations {
  beginner: React.ReactNode;
  advanced: React.ReactNode;
  default: React.ReactNode;
}

const ContentAdapter: React.FC<ContentAdapterProps> = ({
  chapterId,
  children,
  beginnerContent,
  advancedContent,
  defaultContent
}) => {
  const { user } = useAuth();
  const [currentMode, setCurrentMode] = useState<'beginner' | 'advanced' | 'default'>('default');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPersonalizationPreference();
  }, [user, chapterId]);

  const fetchPersonalizationPreference = async () => {
    if (!user) {
      // If user is not logged in, use default content
      setCurrentMode('default');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/personalization/chapter/${chapterId}`);
      if (response.ok) {
        const data = await response.json();
        const userMode = data.userContentMode || data.defaultContentMode || 'default';
        setCurrentMode(userMode as 'beginner' | 'advanced' | 'default');
      } else {
        // If there's an error, default to user's background level or default
        setCurrentMode(user?.softwareBackgroundLevel || 'default');
      }
    } catch (error) {
      console.error('Error fetching personalization preference:', error);
      // Default to user's background level or default
      setCurrentMode(user?.softwareBackgroundLevel || 'default');
    } finally {
      setLoading(false);
    }
  };

  // If loading, show a placeholder or the default content
  if (loading) {
    return <div>Loading personalized content...</div>;
  }

  // Determine which content to show based on current mode
  let contentToDisplay = children; // fallback to children if nothing else is specified

  if (currentMode === 'beginner' && beginnerContent) {
    contentToDisplay = beginnerContent;
  } else if (currentMode === 'advanced' && advancedContent) {
    contentToDisplay = advancedContent;
  } else if (currentMode === 'default' && defaultContent) {
    contentToDisplay = defaultContent;
  } else if (defaultContent) {
    // If no mode-specific content exists but defaultContent is provided
    contentToDisplay = defaultContent;
  }

  return <div className={`content-adapter content-mode-${currentMode}`}>{contentToDisplay}</div>;
};

export default ContentAdapter;