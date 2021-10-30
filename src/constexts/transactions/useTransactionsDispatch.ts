import { createContext, useContext } from 'react';
import { TransactionsDispatch } from './types';

export const TransactionsDispatchContext = createContext<TransactionsDispatch | undefined>(undefined);

export const useTransactionsDispatch = () => {
  const context = useContext(TransactionsDispatchContext);
  if (context === undefined) {
    throw new Error('useCategoriesDispatch must be used within a TransactionsProvider');
  }
  return context;
};
