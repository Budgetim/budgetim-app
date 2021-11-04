import compareDesc from 'date-fns/compareDesc';

import { TransactionsContextState, TransactionsDispatchAction } from './types';

export const transactionsReducer = (state: TransactionsContextState, action: TransactionsDispatchAction) => {
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

    case 'deleteTransaction': {
      const { id } = action.payload;

      return {
        ...state,
        data: state.data.filter(item => item.id !== id),
      };
    }

    case 'editTransaction': {
      const { transaction } = action.payload;

      return {
        ...state,
        data: state.data.map(item => {
          if (item.id === transaction.id) {
            return transaction;
          }
          return item;
        }),
      };
    }

    case 'addTransaction': {
      const {transaction} = action.payload;

      return {
        ...state,
        data: [...state.data, transaction].sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))),
      };
    }

    case 'setError': {
      const {error} = action.payload;
      return {
        ...state,
        isLoading: false,
        error,
      };
    }

    case 'setModalVisible': {
      const { isVisible } = action.payload;
      return {
        ...state,
        modal: {
          ...state.modal,
          isVisible,
        },
      };
    }

    case 'setModalTransactionId': {
      const { id } = action.payload;
      return {
        ...state,
        modal: {
          ...state.modal,
          id,
        },
      };
    }

    default: {
      throw new Error('Unhandled action type');
    }
  }
};
