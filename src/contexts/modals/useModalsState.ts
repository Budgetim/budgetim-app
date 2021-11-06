import { createContext, useContext } from 'react';
import { ModalsContextState } from './types';

export const ModalsStateContext = createContext<ModalsContextState | undefined>(undefined);

export const useModalsState = () => {
  const context = useContext(ModalsStateContext);
  if (context === undefined) {
    throw new Error('useModalsState must be used within a ModalsProvider');
  }
  return context;
};
