import { useContext } from 'react';
import { AppDispatchContext } from './';

export const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a AppProvider');
  }
  return context;
};
