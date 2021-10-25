import { Category } from '../../types';
import { authHeader } from '../../helpers/authHeader';

export const getCategories = async (token: string | null): Promise<Category[]> => {
  try {
    const response = await fetch('https://api.budgetim.ru/categories', {
      headers: authHeader(token),
    });
    return await response.json() as Category[];
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
