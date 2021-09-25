import { Transaction } from '../../types';

type CallbackFunc = (categories: Transaction[]) => void;

export const getTransactions = async (callback: CallbackFunc, errorCallback: (err: string) => void) => {
  try {
    const response = await fetch('https://api.budgetim.ru/transaction');
    const transactions = await response.json();
    callback(transactions);
  } catch (error) {
    errorCallback(error);
  }
}
