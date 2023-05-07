import { ModalsContextState, ModalsDispatchAction } from './types';

export const modalsReducer = (state: ModalsContextState, action: ModalsDispatchAction) => {
  switch (action.type) {
    case 'setTransactionModal': {
      const id = action.payload?.id || null;
      return {
        ...state,
        transaction: {
          id,
          isVisible: true,
        },
      };
    }

    case 'closeTransactionModal': {
      return {
        ...state,
        transaction: {
          ...state.transaction,
          isVisible: false,
        },
      };
    }

    case 'setCategoryModal': {
      const id = action.payload?.id || null;
      return {
        ...state,
        category: {
          id,
          isVisible: true,
        },
      };
    }

    case 'closeCategoryModal': {
      return {
        ...state,
        category: {
          ...state.category,
          isVisible: false,
        },
      };
    }

    default: {
      throw new Error('Unhandled action type');
    }
  }
};
