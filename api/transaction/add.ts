import { Transaction } from '../../types';

interface AddParams {
  title: string;
}

type CallbackFunc = (transaction: Transaction) => void;

export const add = async (params: AddParams, callback: CallbackFunc) => {
  try {
    const response = await fetch('https://api.budgetim.ru/transaction/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...params,
        categoryId: 1,
        price: 0,
        date: new Date(),
      }),
    });
    const transaction = await response.json();
    callback(transaction);
  } catch (error) {
    console.log(error);
  }
}
