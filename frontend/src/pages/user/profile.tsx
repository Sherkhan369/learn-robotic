import React from 'react';
import UserProfile from '../../components/User/UserProfile';
import Layout from '@theme/Layout';

const ProfilePage: React.FC = () => {
  return (
    <Layout title="User Profile" description="Manage your profile and background information">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <UserProfile />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;