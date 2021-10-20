import { Transaction } from '../../types';
import { authHeader } from '../../helpers/authHeader';

interface AddParams {
  title: string;
  categoryId: number | null;
  price: string;
  date: Date;
}

type CallbackFunc = (transaction: Transaction) => void;

export const addTransaction = async (params: AddParams, callback: CallbackFunc, token: string | null) => {
  try {
    const response = await fetch('https://api.budgetim.ru/transaction/add', {
      method: 'POST',
      headers: {
        ...authHeader(token),
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
