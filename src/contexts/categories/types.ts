import { Category } from '../../types';

interface Action<T extends string, P extends unknown> {
  type: T;
  payload: P;
}

type SetDataAction = Action<'setData', {
  data: Category[];
}>

type SetErrorAction = Action<'setError', {
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

export type CategoriesDispatchAction =
  SetDataAction |
  SetErrorAction |
  DeleteCategoryAction |
  AddCategoryAction |
  EditCategoryAction;

export type CategoriesDispatch = (action: CategoriesDispatchAction) => void;

export interface CategoriesContextState {
  isLoading: boolean;
  error: string | null;
  data: Category[];
}
