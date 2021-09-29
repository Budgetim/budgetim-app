import { AppContextState, AppDispatchAction } from './types';

export const appReducer = (state: AppContextState, action: AppDispatchAction) => {
  switch (action.type) {
    case 'setTransactions': {
      const { data } = action.payload;
      return {
        ...state,
        transactions: data,
        isLoadingTransactions: false,
        errorTransactions: null,
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

    case 'setErrorTransactions': {
      const { error } = action.payload;
      return {
        ...state,
        isLoadingTransactions: false,
        errorTransactions: error,
      };
    }

    case 'setCategories': {
      const { data } = action.payload;
      return {
        ...state,
        categories: data,
        isLoadingCategories: false,
        errorCategories: null,
      };
    }

    case 'setErrorCategories': {
      const { error } = action.payload;
      return {
        ...state,
        isLoadingCategories: false,
        errorCategories: error,
      };
    }

    default: {
      throw new Error('Unhandled action type');
    }
  }
};
