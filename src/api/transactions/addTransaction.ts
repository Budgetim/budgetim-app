import { authHeader } from '../../helpers/authHeader';
import { Transaction } from '../../types';
import format from 'date-fns/format';
import { formatNumberForServer } from '../../utils/formatNumberForServer';

interface AddParams {
  title: string;
  categoryId: number | null;
  price: string;
  date: Date;
}

export const addTransaction = async (params: AddParams, token: string | null): Promise<Transaction> => {
  const { price } = params;
  try {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await fetch('https://api.budgetim.ru/transactions', {
      method: 'POST',
      headers: {
        ...authHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...params,
        price: formatNumberForServer(price),
        date: format(params.date, 'yyyy-MM-dd'),
      }),
    });
    if (response.status === 403) {
      throw 403;
    }
    const transaction = await response.json() as Transaction;
    return transaction;
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
