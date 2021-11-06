import { createContext, useContext } from 'react';
import { ModalsDispatch } from './types';

export const ModalsDispatchContext = createContext<ModalsDispatch | undefined>(undefined);

export const useModalsDispatch = () => {
  const context = useContext(ModalsDispatchContext);
  if (context === undefined) {
    throw new Error('useCategoriesDispatch must be used within a ModalsProvider');
  }
  return context;
};
