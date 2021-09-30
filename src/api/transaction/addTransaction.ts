import { Transaction } from '../../types';

interface AddParams {
  title: string;
  categoryId: number;
  price: string;
  date: Date;
}

type CallbackFunc = (transaction: Transaction) => void;

export const addTransaction = async (params: AddParams, callback: CallbackFunc) => {
  try {
    const response = await fetch('https://api.budgetim.ru/transaction/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const transaction = await response.json();
    callback(transaction);
  } catch (error) {
    console.log(error);
  }
}
