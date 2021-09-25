import { Transaction } from '../../types';

interface EditTransactionParams {
  id: number;
  title: string;
  categoryId: number;
  price: number;
  date: string;
}

type CallbackFunc = (transaction: Transaction) => void;

export const editTransaction = async (params: EditTransactionParams, callback: CallbackFunc) => {
  try {
    const response = await fetch('https://api.budgetim.ru/transaction/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const transaction = await response.json();
    callback(transaction);
  } catch (error) {
    console.log(error);
  }
}
