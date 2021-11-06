import { createContext, useContext } from 'react';
import { CategoriesDispatch } from './types';

export const AppDispatchContext = createContext<CategoriesDispatch | undefined>(undefined);

export const useCategoriesDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error('useCategoriesDispatch must be used within a ModalsProvider');
  }
  return context;
};
