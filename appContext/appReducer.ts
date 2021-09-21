import { AppContextState, AppDispatchAction } from './types';

export const appReducer = (state: AppContextState, action: AppDispatchAction) => {
  const { } = state;
  switch (action.type) {
    case 'setData': {
      const { data } = action.payload;
      return {
        ...state,
        transactions: data,
        isLoading: false,
        error: null,
      };
    }

    case 'deleteTransaction': {
      const { id } = action.payload;
      return {
        ...state,
        transactions: state.transactions.filter(item => item._id !== id),
      };
    }

    case 'setError': {
      const { error } = action.payload;
      return {
        ...state,
        isLoading: false,
        error,
      };
    }
    default: {
      throw new Error('Unhandled action type');
    }
  }
};
