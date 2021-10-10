import { authHeader } from '../../helpers/authHeader';

export const deleteTransaction = async (id: number, callback: () => void, token: string | null) => {
  try {
    const response = await fetch('https://api.budgetim.ru/transaction/delete', {
      method: 'POST',
      headers: {
        ...authHeader(token),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      callback();
    }
  } catch (error) {
    console.log(error);
  }
}
