import { authHeader } from '../../helpers/authHeader';

export const deleteTransaction = async (id: number, token: string | null) => {
  try {
    const response = await fetch(`http://api.budgetim.ru/transactions/${id}`, {
      method: 'DELETE',
      headers: {
        ...authHeader(token),
        'Content-Type': 'application/json'
      },
    });
    if (response.status === 403) {
      throw 403;
    }
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
