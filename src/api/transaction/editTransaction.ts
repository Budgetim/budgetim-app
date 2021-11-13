import { Transaction } from '../../types';
import { authHeader } from '../../helpers/authHeader';
import format from 'date-fns/format';
import { formatNumberForServer } from '../../utils/formatNumberForServer';

interface EditTransactionParams {
  id: number;
  title: string;
  categoryId: number | null;
  price: string;
  date: Date;
}

export const editTransaction = async (params: EditTransactionParams, token: string | null): Promise<Transaction> => {
  const { price } = params;
  try {
    const response = await fetch('https://api.budgetim.ru/transaction/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(token),
      },
      body: JSON.stringify({
        ...params,
        price: formatNumberForServer(price),
        date: format(params.date, 'yyyy-MM-dd'),
      }),
    });
    const transaction = await response.json() as Transaction;
    return transaction;
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
