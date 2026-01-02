import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface UserProfileData {
  id: string;
  email: string;
  name?: string;
  registrationDate: string;
  background: {
    id: string;
    softwareSkillLevel: string;
    hardwareSkillLevel: string;
    preferences?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
  } | null;
}

const UserProfile: React.FC = () => {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    softwareBackgroundLevel: 'beginner',
    hardwareBackgroundLevel: 'beginner',
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoadingProfile(true);
      const response = await fetch('/api/auth/profile');

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setFormData({
          softwareBackgroundLevel: data.background?.softwareSkillLevel || 'beginner',
          hardwareBackgroundLevel: data.background?.hardwareSkillLevel || 'beginner',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleUpdateBackground = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/background', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(prev => prev ? { ...prev, background: data.userBackground } : null);
        setEditing(false);
      }
    } catch (error) {
      console.error('Error updating background:', error);
    }
  };

  if (loading || loadingProfile) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile found.</div>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>

      <div className="profile-info">
        <h3>Account Information</h3>
        <p><strong>Name:</strong> {profile.name || 'Not provided'}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Registration Date:</strong> {new Date(profile.registrationDate).toLocaleDateString()}</p>
      </div>

      <div className="background-info">
        <h3>Background Information</h3>
        {profile.background ? (
          <>
            <p><strong>Software Background:</strong> {profile.background.softwareSkillLevel}</p>
            <p><strong>Hardware Background:</strong> {profile.background.hardwareSkillLevel}</p>
          </>
        ) : (
          <p>No background information provided yet.</p>
        )}

        {editing ? (
          <form onSubmit={handleUpdateBackground} className="background-edit-form">
            <div className="form-group">
              <label htmlFor="softwareBackgroundLevel">Software Background</label>
              <select
                id="softwareBackgroundLevel"
                name="softwareBackgroundLevel"
                value={formData.softwareBackgroundLevel}
                onChange={(e) => setFormData({...formData, softwareBackgroundLevel: e.target.value})}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="hardwareBackgroundLevel">Hardware Background</label>
              <select
                id="hardwareBackgroundLevel"
                name="hardwareBackgroundLevel"
                value={formData.hardwareBackgroundLevel}
                onChange={(e) => setFormData({...formData, hardwareBackgroundLevel: e.target.value})}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <button type="submit" className="submit-button">Update Background</button>
            <button type="button" onClick={() => setEditing(false)} className="cancel-button">Cancel</button>
          </form>
        ) : (
          <button onClick={() => setEditing(true)} className="edit-button">Edit Background</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;