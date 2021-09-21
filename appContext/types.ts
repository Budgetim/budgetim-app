import { Transaction } from '../types';

export interface SetDataAction {
  type: 'setData';
  payload: { data: Transaction[] };
}

export interface SetErrorAction {
  type: 'setError';
  payload: { error: string };
}

export interface DeleteTransactionAction {
  type: 'deleteTransaction';
  payload: { id: string };
}

export interface AddTransactionAction {
  type: 'addTransaction';
  payload: Transaction;
}

export type AppDispatchAction = SetDataAction | SetErrorAction | DeleteTransactionAction | AddTransactionAction;

export type AppDispatch = (action: AppDispatchAction) => void;

export interface AppContextState {
  isLoading: boolean;
  transactions: Transaction[];
  error: string | null;
}
