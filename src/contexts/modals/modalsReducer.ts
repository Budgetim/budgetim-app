import { ModalsContextState, ModalsDispatchAction } from './types';

export const modalsReducer = (state: ModalsContextState, action: ModalsDispatchAction) => {
  switch (action.type) {
    case 'setTransactionModalVisible': {
      const { isVisible } = action.payload;
      return {
        ...state,
        transaction: {
          ...state.transaction,
          isVisible,
        },
      };
    }

    case 'setModalTransactionId': {
      const { id } = action.payload;
      return {
        ...state,
        transaction: {
          ...state.transaction,
          id,
        },
      };
    }

    default: {
      throw new Error('Unhandled action type');
    }
  }
};
