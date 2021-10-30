import { createContext, useContext } from 'react';
import { CategoriesContextState } from './types';

export const CategoriesStateContext = createContext<CategoriesContextState | undefined>(undefined);

export const useCategoriesState = () => {
  const context = useContext(CategoriesStateContext);
  if (context === undefined) {
    throw new Error('useCategoriesState must be used within a CategoriesProvider');
  }
  return context;
};
