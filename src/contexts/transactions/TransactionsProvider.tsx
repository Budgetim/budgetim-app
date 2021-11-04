import React, { FC, useReducer } from 'react';

import { transactionsReducer } from './transactionsReducer';
import { TransactionsDispatchContext } from './useTransactionsDispatch';
import { TransactionsStateContext } from './useTransactionsState';
import { TransactionsContextState } from './types';

export const TransactionsProvider: FC = ({ children }) => {

  const initialState: TransactionsContextState = {
    isLoading: true,
    data: [],
    error: null,
    modal: {
      id: null,
      isVisible: false,
    }
  };

  const [state, dispatch] = useReducer(transactionsReducer, initialState);

  return (
    <TransactionsStateContext.Provider value={state}>
      <TransactionsDispatchContext.Provider value={dispatch}>{children}</TransactionsDispatchContext.Provider>
    </TransactionsStateContext.Provider>
  );
};
