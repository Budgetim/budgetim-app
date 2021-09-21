import { useContext } from 'react';
import { AppStateContext } from './';

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider');
  }
  return context;
};
