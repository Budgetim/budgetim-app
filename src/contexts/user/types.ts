import { Currency, User } from '../../types';

interface Action<T extends string, P extends unknown> {
  type: T;
  payload: P;
}

type SetUserAction = Action<'setUser', {
  user: User;
}>

type SetTokenAction = Action<'setToken', {
  token: string | null;
}>

export type UserDispatchAction =
  SetUserAction |
  SetTokenAction;

export type UserDispatch = (action: UserDispatchAction) => void;

export interface UserContextState {
  email: string;
  id: number | null;
  name: string;
  token: string | null;
  currency?: Currency;
}
