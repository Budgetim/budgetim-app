import { createContext, useContext } from 'react';
import { UserDispatch } from './types';

export const UserDispatchContext = createContext<UserDispatch | undefined>(undefined);

export const useUserDispatch = () => {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
};
