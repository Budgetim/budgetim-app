import { authHeader } from '../../helpers/authHeader';
import { Transaction } from '../../types';
import format from 'date-fns/format';

interface AddParams {
  title: string;
  categoryId: number | null;
  price: string;
  date: Date;
}

export const addTransaction = async (params: AddParams, token: string | null): Promise<Transaction> => {
  try {
    const response = await fetch('https://api.budgetim.ru/transaction/add', {
      method: 'POST',
      headers: {
        ...authHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...params, date: format(params.date, 'yyyy-MM-dd')}),
    });
    return await response.json() as Transaction;
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
