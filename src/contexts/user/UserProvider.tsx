import React, { FC, useReducer } from 'react';

import { userReducer } from './userReducer';
import { UserDispatchContext } from './useUserDispatch';
import { UserStateContext } from './useUserState';
import { UserContextState } from './types';

export const UserProvider: FC = ({ children }) => {

  const initialState: UserContextState = {
    email: '',
    id: null,
    name: '',
    token: null,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};
