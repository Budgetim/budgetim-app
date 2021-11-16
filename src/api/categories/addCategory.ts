import { Category } from '../../types';
import { authHeader } from '../../helpers/authHeader';

interface AddParams {
  title: string;
  description: string | null;
  color: string | null;
}

export const addCategory = async (params: AddParams, token: string | null): Promise<Category> => {
  try {
    const response = await fetch('https://api.budgetim.ru/categories', {
      method: 'POST',
      headers: {
        ...authHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (response.status === 403) {
      throw 403;
    }

    return await response.json() as Category;
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
