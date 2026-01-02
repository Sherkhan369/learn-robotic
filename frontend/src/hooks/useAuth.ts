import { useContext } from 'react';
import { AuthContext, useAuth as useAuthBase } from '../contexts/AuthContext';

// This is a wrapper hook that provides the same functionality as the context
// but with a cleaner interface
const useAuth = () => {
  return useAuthBase();
};

export default useAuth;