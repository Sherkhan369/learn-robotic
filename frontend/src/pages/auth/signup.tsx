import React from 'react';
import SignupForm from '../../components/Auth/SignupForm';
import Layout from '@theme/Layout';

const SignupPage: React.FC = () => {
  return (
    <Layout title="Sign Up" description="Create an account for the Robotic Book">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <SignupForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;