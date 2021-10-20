import { Transaction } from '../../types';
import { authHeader } from '../../helpers/authHeader';

interface EditTransactionParams {
  id: number;
  title: string;
  categoryId: number | null;
  price: string;
  date: Date;
}

type CallbackFunc = (transaction: Transaction) => void;

export const editTransaction = async (params: EditTransactionParams, callback: CallbackFunc, token: string | null) => {
  try {
    const response = await fetch('https://api.budgetim.ru/transaction/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(token),
      },
      body: JSON.stringify(params),
    });
    const transaction = await response.json();
    callback(transaction);
  } catch (error) {
    console.log(error);
  }
}
