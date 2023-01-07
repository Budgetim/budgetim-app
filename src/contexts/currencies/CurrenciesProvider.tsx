import React, { FC, useEffect, useReducer } from 'react';

import { currenciesReducer } from './currenciesReducer';
import { AppDispatchContext } from './useCurrenciesDispatch';
import { CurrenciesStateContext } from './useCurrenciesState';
import { CurrenciesContextState } from './types';
import { getCurrencies } from '../../api/currencies/getCurrencies';

export const CurrenciesProvider: FC = ({ children }) => {
  const initialState: CurrenciesContextState = {
    isLoading: true,
    data: [],
    error: null,
  };

  const [state, dispatch] = useReducer(currenciesReducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const currencies = await getCurrencies();
        dispatch({ type: 'setData', payload: { data: currencies } });
      } catch (error) {
        dispatch({ type: 'setError', payload: { error } });
      }
    })();
  }, []);

  return (
    <CurrenciesStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </CurrenciesStateContext.Provider>
  );
};
