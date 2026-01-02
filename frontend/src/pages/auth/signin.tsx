import React from 'react';
import SigninForm from '../../components/Auth/SigninForm';
import Layout from '@theme/Layout';

const SigninPage: React.FC = () => {
  return (
    <Layout title="Sign In" description="Sign in to your Robotic Book account">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <SigninForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SigninPage;