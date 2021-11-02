import { Transaction } from '../../types';
import { authHeader } from '../../helpers/authHeader';
import { serialize } from '../../utils/serialize';

export const getAvailableMonths = async (token: string | null): Promise<Transaction[]> => {
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

    const response = await fetch(`https://api.budgetim.ru/transaction/availableMonths`, {
      headers: authHeader(token),
    });
    const dates = await response.json() as any;
    return dates;
  } catch (error: unknown) {
    console.error(error);
    throw (error as object).toString();
  }
}
