import { authHeader } from '../../helpers/authHeader';

export const deleteCategory = async (id: number, token: string | null) => {
  try {
    await fetch('https://api.budgetim.ru/categories/delete', {
      method: 'POST',
      headers: {
        ...authHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
