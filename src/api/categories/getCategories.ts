import { Category } from '../../types';
import { authHeader } from '../../helpers/authHeader';

export const getCategories = async (token: string | null): Promise<Category[]> => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await fetch('http://api.budgetim.ru/categories', {
      headers: authHeader(token),
    });
    if (response.status === 403) {
      throw 403;
    }
    return await response.json() as Category[];
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
