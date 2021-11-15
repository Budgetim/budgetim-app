import { authHeader } from '../../helpers/authHeader';

export const deleteTransaction = async (id: number, token: string | null) => {
  try {
    const response = await fetch('https://api.budgetim.ru/transaction/delete', {
      method: 'POST',
      headers: {
        ...authHeader(token),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id }),
    });
    if (response.status === 403) {
      throw 403;
    }
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
