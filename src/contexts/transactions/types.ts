import { Transaction } from '../../types';

interface Action<T extends string, P extends unknown> {
  type: T;
  payload: P;
}

type SetDataAction = Action<
  'setData',
  {
    data: Transaction[];
  }
>;

type SetErrorAction = Action<
  'setError',
  {
    error: string;
  }
>;

type DeleteTransactionAction = Action<
  'deleteTransaction',
  {
    id: number;
  }
>;

type AddTransactionAction = Action<
  'addTransaction',
  {
    transaction: Transaction;
  }
>;

type EditTransactionAction = Action<
  'editTransaction',
  {
    transaction: Transaction;
  }
>;

export type TransactionsDispatchAction =
  | SetDataAction
  | SetErrorAction
  | DeleteTransactionAction
  | AddTransactionAction
  | EditTransactionAction;

export type TransactionsDispatch = (action: TransactionsDispatchAction) => void;

export interface TransactionsContextState {
  isLoading: boolean;
  error: string | null;
  data: Transaction[];
}
