import { Transaction } from '../../types';
import { authHeader } from '../../helpers/authHeader';
import { serialize } from '../../utils/serialize';

interface GetTransactionsParams {
  year: 2021;
  month: 10;
  category?: number;
}

type CallbackFunc = (categories: Transaction[]) => void;

export const getTransactions = async (params: GetTransactionsParams, callback: CallbackFunc, errorCallback: (err: string) => void, token: string | null) => {
  try {
    const response = await fetch(`https://api.budgetim.ru/transaction?${serialize(params)}`, {
      headers: authHeader(token),
    });
    const transactions = await response.json();
    callback(transactions);
  } catch (error) {
    errorCallback(error);
  }
}
