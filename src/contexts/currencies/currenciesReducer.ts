import { CurrenciesContextState, CurrenciesDispatchAction } from './types';

export const currenciesReducer = (state: CurrenciesContextState, action: CurrenciesDispatchAction) => {
  switch (action.type) {
    case 'setData': {
      const { data } = action.payload;
      return {
        ...state,
        isLoading: false,
        error: null,
        data,
      };
    }

    case 'setError': {
      const { error } = action.payload;
      return {
        ...state,
        data: null,
        isLoading: false,
        error,
      };
    }

    default: {
      throw new Error('Unhandled action type');
    }
  }
};
