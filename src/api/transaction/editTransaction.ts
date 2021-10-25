import { Transaction } from '../../types';
import { authHeader } from '../../helpers/authHeader';

interface EditTransactionParams {
  id: number;
  title: string;
  categoryId: number | null;
  price: string;
  date: Date;
}

export const editTransaction = async (params: EditTransactionParams, token: string | null): Promise<Transaction> => {
  try {
    const response = await fetch('https://api.budgetim.ru/transaction/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(token),
      },
      body: JSON.stringify(params),
    });
    return await response.json() as Transaction;
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
