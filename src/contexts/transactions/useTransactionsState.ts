import { createContext, useContext } from 'react';
import { TransactionsContextState } from './types';

export const TransactionsStateContext = createContext<TransactionsContextState | undefined>(undefined);

export const useTransactionsState = () => {
  const context = useContext(TransactionsStateContext);
  if (context === undefined) {
    throw new Error('useModalsState must be used within a ModalsProvider');
  }
  return context;
};
