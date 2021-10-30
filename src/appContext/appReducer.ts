import { AppContextState, AppDispatchAction } from './types';

export const appReducer = (state: AppContextState, action: AppDispatchAction) => {
  switch (action.type) {
    case 'setUser': {
      const { user } = action.payload;
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
