import { UserContextState, UserDispatchAction } from './types';

export const userReducer = (state: UserContextState, action: UserDispatchAction) => {
  switch (action.type) {
    case 'setUser': {
      const { user } = action.payload;
      return {
        ...state,
        ...user,
      };
    }

    case 'setToken': {
      const { token } = action.payload;

      return {
        ...state,
        token,
      };
    }

    default: {
      throw new Error('Unhandled action type');
    }
  }
};
