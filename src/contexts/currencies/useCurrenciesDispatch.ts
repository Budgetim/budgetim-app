import { createContext, useContext } from 'react';
import { CurrenciesDispatch } from './types';

export const AppDispatchContext = createContext<CurrenciesDispatch | undefined>(undefined);

export const useCurrenciesDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error('useCurrenciesDispatch must be used within a CurrenciesProvider');
  }
  return context;
};
