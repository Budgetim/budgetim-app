import { createContext, useContext } from 'react';
import { UserContextState } from './types';

export const UserStateContext = createContext<UserContextState | undefined>(undefined);

export const useUserState = () => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
};
