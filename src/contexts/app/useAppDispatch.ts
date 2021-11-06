import { createContext, useContext } from 'react';
import { AppDispatch } from './types';

export const AppDispatchContext = createContext<AppDispatch | undefined>(undefined);

export const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error('useCategoriesDispatch must be used within a ModalsProvider');
  }
  return context;
};
