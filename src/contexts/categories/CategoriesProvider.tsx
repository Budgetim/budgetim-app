import React, { FC, useEffect, useReducer } from 'react';

import { categoriesReducer } from './categoriesReducer';
import { AppDispatchContext } from './useCategoriesDispatch';
import { CategoriesStateContext } from './useCategoriesState';
import { CategoriesContextState } from './types';
import { getCategories } from '../../api/categories/getCategories';

export const CategoriesProvider: FC = ({ children }) => {
  const initialState: CategoriesContextState = {
    isLoading: true,
    data: [],
    error: null,
    dataLoaded: false,
    modal: {
      id: null,
      isVisible: false,
    },
  };

  const [state, dispatch] = useReducer(categoriesReducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const categories = await getCategories();
        dispatch({ type: 'setData', payload: { data: categories } });
      } catch (error) {
        dispatch({ type: 'setError', payload: { error } });
      }
    })();
  }, []);

  return (
    <CategoriesStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </CategoriesStateContext.Provider>
  );
};
