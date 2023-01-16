import React, { FC, useReducer } from 'react';

import { modalsReducer } from './modalsReducer';
import { ModalsDispatchContext } from './useModalsDispatch';
import { ModalsStateContext } from './useModalsState';
import { ModalsContextState } from './types';

export const ModalsProvider: FC = ({ children }) => {
  const initialState: ModalsContextState = {
    transaction: {
      id: null,
      isVisible: false,
    },
  };

  const [state, dispatch] = useReducer(modalsReducer, initialState);

  return (
    <ModalsStateContext.Provider value={state}>
      <ModalsDispatchContext.Provider value={dispatch}>{children}</ModalsDispatchContext.Provider>
    </ModalsStateContext.Provider>
  );
};
