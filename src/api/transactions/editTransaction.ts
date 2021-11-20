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
  const { id, price, ...restBody } = params;
  try {
    const response = await fetch(`http://api.budgetim.ru/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(token),
      },
      body: JSON.stringify({
        ...restBody,
        price: formatNumberForServer(price),
        date: format(restBody.date, 'yyyy-MM-dd'),
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
