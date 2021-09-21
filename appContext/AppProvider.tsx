import React, { FC, useReducer } from 'react';

import { appReducer } from './appReducer';
import { AppStateContext, AppDispatchContext } from './';

export const AppProvider: FC = ({ children }) => {

  const initialState = {
    isLoading: true,
    transactions: [],
    error: null,
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};
