import { useContext } from 'react';
import { PersonalizationContext, usePersonalization as usePersonalizationBase } from '../contexts/PersonalizationContext';

// This is a wrapper hook that provides the same functionality as the context
// but with a cleaner interface
const usePersonalization = () => {
  return usePersonalizationBase();
};

export default usePersonalization;