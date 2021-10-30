import { User } from '../../types';

interface Action<T extends string, P extends unknown> {
  type: T;
  payload: P;
}

type SetUserAction = Action<'setUser', {
  user: User;
}>

type RestoreTokenAction = Action<'restoreToken', {
  token: string | null;
}>

type SignInAction = Action<'signIn', {
  token: string | null;
}>

type SignOutAction = Action<'signOut', {}>

export type AppDispatchAction =
  SetUserAction |
  RestoreTokenAction |
  SignInAction |
  SignOutAction;

export type AppDispatch = (action: AppDispatchAction) => void;

export interface AppContextState {
  user: {
    email: string;
    userId: number | null;
    name: string;
    token: string | null;
    isLoading: boolean;
  },
}
