import { Category, Transaction } from '../types';

export interface SetTransactionsAction {
  type: 'setTransactions';
  payload: { data: Transaction[] };
}

export interface SetErrorTransactionsAction {
  type: 'setErrorTransactions';
  payload: { error: string };
}

export interface DeleteTransactionAction {
  type: 'deleteTransaction';
  payload: { id: number };
}

export interface AddTransactionAction {
  type: 'addTransaction';
  payload: Transaction;
}

export interface EditTransactionAction {
  type: 'editTransaction';
  payload: Transaction;
}

export interface SetCategoriesAction {
  type: 'setCategories';
  payload: { data: Category[] };
}

export interface SetErrorCategoriesAction {
  type: 'setErrorCategories';
  payload: { error: string };
}

export interface DeleteCategoryAction {
  type: 'deleteCategory',
  payload: { id: number };
}

export interface AddCategoryAction {
  type: 'addCategory';
  payload: Category;
}

export interface EditCategoryAction {
  type: 'editCategory';
  payload: Category;
}

export type AppDispatchAction =
  SetTransactionsAction |
  SetCategoriesAction |
  SetErrorTransactionsAction |
  DeleteTransactionAction |
  AddTransactionAction |
  EditTransactionAction |
  SetErrorCategoriesAction |
  DeleteCategoryAction |
  AddCategoryAction |
  EditCategoryAction;

export type AppDispatch = (action: AppDispatchAction) => void;

export interface AppContextState {
  isLoadingTransactions: boolean;
  transactions: Transaction[];
  errorTransactions: string | null;
  isLoadingCategories: boolean;
  categories: Category[];
  errorCategories: string | null;
}
