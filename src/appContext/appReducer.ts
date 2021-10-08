import compareDesc from 'date-fns/compareDesc';

import { AppContextState, AppDispatchAction } from './types';

export const appReducer = (state: AppContextState, action: AppDispatchAction) => {
  const { transactions, categories } = state;

  switch (action.type) {
    case 'setTransactions': {
      const {data} = action.payload;
      return {
        ...state,
        transactions: {
          isLoading: false,
          error: null,
          data,
        },
      };
    }

    case 'deleteTransaction': {
      const {id} = action.payload;

      return {
        ...state,
        transactions: {
          ...transactions,
          data: transactions.data.filter(item => item.id !== id),
        },
      };
    }

    case 'editTransaction': {
      const {transaction} = action.payload;

      return {
        ...state,
        transactions: {
          ...transactions,
          data: transactions.data.map(item => {
            if (item.id === transaction.id) {
              return transaction;
            }
            return item;
          }),
        },
      };
    }

    case 'addTransaction': {
      const {transaction} = action.payload;

      return {
        ...state,
        transactions: {
          ...transactions,
          data: [...transactions.data, transaction].sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
        },
      };
    }

    case 'setErrorTransactions': {
      const {error} = action.payload;
      return {
        ...state,
        transactions: {
          ...transactions,
          isLoading: false,
          error,
        },
      };
    }

    case 'setCategories': {
      const {data} = action.payload;
      return {
        ...state,
        categories: {
          isLoading: false,
          error: null,
          data,
        },
      };
    }

    case 'setErrorCategories': {
      const {error} = action.payload;
      return {
        ...state,
        categories: {
          ...categories,
          isLoading: false,
          error,
        },
      };
    }

    case 'deleteCategory': {
      const {id} = action.payload;

      return {
        ...state,
        categories: {
          ...categories,
          data: categories.data.filter(item => item.id !== id),
        },
      };
    }

    case 'editCategory': {
      const {category} = action.payload;

      return {
        ...state,
        categories: {
          ...categories,
          data: categories.data.map(item => {
            if (item.id === category.id) {
              return category;
            }
            return item;
          }),
        },
      };
    }

    case 'addCategory': {
      const {category} = action.payload;

      return {
        ...state,
        categories: {
          ...categories,
          data: [...categories.data, category],
        },
      };
    }

    case 'setUser': {
      const {user} = action.payload;
      return {
        ...state,
        user: {
          ...user,
          userId: user.id,
        },
      };
    }

    case 'restoreToken': {
      const { token } = action.payload;

      return {
        ...state,
        user: {
          ...state.user,
          token,
          isLoading: false,
        },
      };
    }

    case 'signOut': {
      return {
        ...state,
        user: {
          ...state.user,
          token: null,
        },
      };
    }

    default: {
      throw new Error('Unhandled action type');
    }
  }
};
