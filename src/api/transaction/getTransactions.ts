import { Transaction } from '../../types';
import { authHeader } from '../../helpers/authHeader';
import { serialize } from '../../utils/serialize';

interface GetTransactionsParams {
  year: number;
  month: number;
  category?: number;
}

export const getTransactions = async (params: GetTransactionsParams, token: string | null): Promise<Transaction[]> => {
  try {
    // const fn = async () => {
    //   const response = await fetch(`https://api.budgetim.ru/transaction?${serialize(params)}`, {
    //     headers: authHeader(token),
    //   });
    //
    //   const result = await response.json() as Transaction[];
    //
    //   return new Promise((resolve => {
    //     setTimeout(() => {
    //       resolve(result);
    //     }, 5000);
    //   }))
    // }
    //
    // const res = await fn();
    // return res;

    const response = await fetch(`https://api.budgetim.ru/transaction?${serialize(params)}`, {
      headers: authHeader(token),
    });
    return await response.json() as Transaction[];
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
