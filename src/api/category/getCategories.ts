import { Category } from '../../types';
import { authHeader } from '../../helpers/authHeader';

type CallbackFunc = (categories: Category[]) => void;

export const getCategories = async (callback: CallbackFunc, errorCallback: (error: string) => void, token: string | null) => {
  try {
    const response = await fetch('https://api.budgetim.ru/categories', {
      headers: authHeader(token),
    });
    const categories = await response.json();
    callback(categories);
  } catch (error) {
    callback(error);
  }
}
