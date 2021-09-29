import { Category } from '../../types';

type CallbackFunc = (categories: Category[]) => void;

export const getCategories = async (callback: CallbackFunc, errorCallback: (error: string) => void) => {
  try {
    const response = await fetch('https://api.budgetim.ru/categories');
    const categories = await response.json();
    callback(categories);
  } catch (error) {
    callback(error);
  }
}
