import { Transaction } from '../../types';
import { authHeader } from '../../utils/authHeader';
import { serialize } from '../../utils/serialize';

interface GetTransactionsParams {
  year?: number;
  month?: number;
  category?: number | null;
}

export const getTransactions = async (params: GetTransactionsParams, token: string | null): Promise<Transaction[]> => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await fetch(`http://api.budgetim.ru/transactions?${serialize(params)}`, {
      headers: authHeader(token),
    });

    if (response.status === 403) {
      throw 403;
    }
    const transactions = (await response.json()) as Transaction[];
    return transactions;
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
};
