import { AppContextState, AppDispatchAction } from './types';

export const appReducer = (state: AppContextState, action: AppDispatchAction) => {
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
        transactions: state.transactions.filter(item => item.id !== id),
      };
    }

    case 'editTransaction': {
      const transaction = action.payload;
      return {
        ...state,
        transactions: state.transactions.map(item => {
          if (item.id === transaction.id) {
            return transaction;
          }
          return item;
        }),
      };
    }

    case 'addTransaction': {
      const transaction = action.payload;
      return {
        ...state,
        transactions: [...state.transactions, transaction],
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
