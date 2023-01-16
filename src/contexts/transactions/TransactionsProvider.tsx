import React, { FC, useEffect, useReducer } from 'react';

import { transactionsReducer } from './transactionsReducer';
import { TransactionsDispatchContext } from './useTransactionsDispatch';
import { TransactionsStateContext } from './useTransactionsState';
import { TransactionsContextState } from './types';
import { getTransactions } from '../../api/transactions/getTransactions';

interface TransactionsProviderProps {
  category?: number;
  month?: number;
  year?: number;
}

export const TransactionsProvider: FC<TransactionsProviderProps> = ({ children, category, month, year }) => {
  const initialState: TransactionsContextState = {
    isLoading: true,
    data: [],
    error: null,
  };

  const [state, dispatch] = useReducer(transactionsReducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const transactions = await getTransactions({ year, month, category });
        dispatch({ type: 'setData', payload: { data: transactions } });
      } catch (error) {
        dispatch({ type: 'setError', payload: { error } });
      }
    })();
  }, []);

  return (
    <TransactionsStateContext.Provider value={state}>
      <TransactionsDispatchContext.Provider value={dispatch}>{children}</TransactionsDispatchContext.Provider>
    </TransactionsStateContext.Provider>
  );
};
