import { createContext, useContext } from 'react';
import { AppContextState } from './types';

export const AppStateContext = createContext<AppContextState | undefined>(undefined);

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useTransactionsState must be used within a TransactionsProvider');
  }
  return context;
};
