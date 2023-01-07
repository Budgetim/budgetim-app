import { createContext, useContext } from 'react';
import { CurrenciesContextState } from './types';

export const CurrenciesStateContext = createContext<CurrenciesContextState | undefined>(undefined);

export const useCurrenciesState = () => {
  const context = useContext(CurrenciesStateContext);
  if (context === undefined) {
    throw new Error('useCurrenciesState must be used within a CurrenciesProvider');
  }
  return context;
};
