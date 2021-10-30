import React, { FC, useReducer } from 'react';

import { appReducer } from './appReducer';
import { AppDispatchContext } from './useAppDispatch';
import { AppStateContext } from './useAppState';
import { AppContextState } from './types';

export const AppProvider: FC = ({ children }) => {

  const initialState: AppContextState = {
    user: {
      email: '',
      userId: null,
      name: '',
      token: null,
      isLoading: true,
    },
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};
