import { Transaction } from '../../types';
import { authHeader } from '../../helpers/authHeader';

type CallbackFunc = (categories: Transaction[]) => void;

export const getTransactions = async (callback: CallbackFunc, errorCallback: (err: string) => void, token: string | null) => {
  try {
    const response = await fetch('https://api.budgetim.ru/transaction', {
      headers: authHeader(token),
    });
    const transactions = await response.json();
    callback(transactions);
  } catch (error) {
    errorCallback(error);
  }
}
