import { Category, Transaction, User } from '../types';

interface Action<T extends string, P extends unknown> {
  type: T;
  payload: P;
}

type SetTransactionsAction = Action<'setTransactions', {
  data: Transaction[];
}>

type SetErrorTransactionsAction = Action<'setErrorTransactions', {
  error: string;
}>

type DeleteTransactionAction = Action<'deleteTransaction', {
  id: number;
}>

type AddTransactionAction = Action<'addTransaction', {
  transaction: Transaction;
}>

type EditTransactionAction = Action<'editTransaction', {
  transaction: Transaction;
}>

type SetCategoriesAction = Action<'setCategories', {
  data: Category[];
}>

type SetErrorCategoriesAction = Action<'setErrorCategories', {
  error: string;
}>

type DeleteCategoryAction = Action<'deleteCategory', {
  id: number;
}>

type AddCategoryAction = Action<'addCategory', {
  category: Category;
}>

type EditCategoryAction = Action<'editCategory', {
  category: Category;
}>

type SetUserAction = Action<'setUser', {
  user: User;
}>

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
  EditCategoryAction |
  SetUserAction;

export type AppDispatch = (action: AppDispatchAction) => void;

export interface AppContextState {
  transactions: {
    isLoading: boolean;
    error: string | null;
    data: Transaction[];
  }
  categories: {
    isLoading: boolean;
    error: string | null;
    data: Category[];
  },
  user: {
    email: string;
    userId: number | null;
    name: string;
    token: string;
  },
}
