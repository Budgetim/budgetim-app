import React, { FC, useReducer } from 'react';

import { categoriesReducer } from './categoriesReducer';
import { AppDispatchContext } from './useCategoriesDispatch';
import { CategoriesStateContext } from './useCategoriesState';
import { CategoriesContextState } from './types';

export const CategoriesProvider: FC = ({ children }) => {

  const initialState: CategoriesContextState = {
    isLoading: true,
    data: [],
    error: null,
    modal: {
      id: null,
      isVisible: false,
    }
  };

  const [state, dispatch] = useReducer(categoriesReducer, initialState);

  return (
    <CategoriesStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </CategoriesStateContext.Provider>
  );
};
